import Head from "next/head.js";
import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList.js";
import Layout from "../components/layout/Layout.js";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}


// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://nelsonsusanto16:u8D7kdUf0jYcotUF@cluster0.aqc5bgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1
  };
}

export default HomePage;