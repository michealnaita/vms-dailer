import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaArrowRight,
} from 'react-icons/fa';

export default function Home() {
  return (
    <div className="text-white bg-black flex flex-col justify-center min-h-full max-w-full">
      <header className="flex px-4 items-center justify-between">
        <Image src="/logo.png" alt="logo" width="150" height="150" />
        <div className="space-x-4">
          <Link href="/phone">
            <a className="hover:text-cyan-500 text-xl">Sign In</a>
          </Link>
        </div>
      </header>
      <div className="flex-1 flex gap-8 justify-center items-center flex-col px-4 max-w-[600px] mx-auto">
        <h1 className="text-5xl text-center font-bold">
          Why write letters when you can send audio notes instead!
        </h1>
        <p className="text-gray-500 text-center text-lg">
          Mails 2 enables sudents in school to communicate with their peers in
          other schools through sending audio notes without needing to bring
          phones to school.
        </p>
        <Link href="https://chat.whatsapp.com/Fk1i49ipQowKt8g7gV0s9d">
          <a>
            <button className="btn-primary">Join Beta</button>
          </a>
        </Link>
      </div>
      <section className="my-8 p-8">
        <div className="text-left flex flex-col gap-4 justify-center items-start">
          <h1 className="text-3xl text-center font-bold mb-10 w-max">
            So what is Mail 2?
          </h1>
          <p className="max-w-[600px] text-gray-500 text-lg">
            Mail 2 is a modern solution to the way students communicate with
            peers in other schools by providing a way to send audio notes
            instead of letters.
            <br /> The traditional way of sending mail through letters was slow
            and tiresome because it required you to write all the time and how
            offen and the mailman would come to your school and your peers,
            non-express because texts can only go so far, conversations would
            offen lose track due to long delays and if your school didnt care
            about mail then you would never send mail at all.
            <br /> Mail 2 solves all these problems by making it audio
            based,powered cloud technologies and not dependent on mailmen or
            school administration. messages will be delivered as soon as you
            send them, Senders can create more expressive and meaningful
            messages. Mail 2 does not require that students have phones in
            school or any device as such because our technology build on media
            thats already in schools like call booths
          </p>
          <button className="btn-secondary flex items-center gap-4">
            <a href="https://chat.whatsapp.com/Fk1i49ipQowKt8g7gV0s9d">
              Join Beta Program
            </a>
          </button>
        </div>
      </section>
      <section className="md:my-8 p-8">
        <div className="text-left flex flex-col gap-4 justify-center items-end">
          <h1 className="text-3xl text-left font-bold mb-10 md:w-[600px] ">
            But how does it work?
          </h1>
          <p className="max-w-[600px] text-gray-500 text-lg">
            As impossible as it might sound its actually quite simple. Mail 2
            connects with the students at school using an interactive voice
            response system (ivr) that can be accessed using the call booths at
            their schools.
            <br /> You have interacted with an ivr when you called customer care
            for any carrier like mtn its the voice the serves you options before
            you can actually speak to the agent.
            <br /> What happens is that the student will call a phone number
            that mail 2 provides the same way they would anyone at the booth but
            this time call will be redirected to an ivr built by mail 2 you can
            test this ivr{' '}
            <a href="" className="underline">
              here
            </a>{' '}
            by joining our group. Once the students connect to this ivr they can
            create and send messages, get notified and listen to new messages.
          </p>
          <button className="btn-secondary flex items-center gap-4">
            Test demo
          </button>
        </div>
      </section>
      <section className="md:my-8 p-8">
        <div className="text-left flex flex-col gap-4 justify-center items-start">
          <h1 className="text-3xl text-center font-bold mb-10 w-max">
            Lets try the Ivr!
          </h1>
          <p className="max-w-[600px] text-gray-500 text-lg">
            In this video you will see how you can send messages using Mail 2
            IVR. We shall log in as the sender and later login as the receiver
            to listen to the message.
          </p>
          <div className=" h-[300px] w-full max-w-[500px]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/qd-wQAHYvPI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="max-w-[600px] text-gray-500 text-lg">
            While In this video you will see how we can listen to the message
            that we sent earlier. we shall log in as the receiver using the
            receivers credentials.
          </p>
          <div className=" h-[300px] w-full max-w-[500px]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xXDwUyS8bJM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
      <section className="md:my-8 p-8">
        <div className="text-left flex flex-col gap-4 justify-center items-end">
          <h1 className="text-3xl text-left font-bold mb-10 md:w-[600px] ">
            And the Beta program?
          </h1>
          <p className="max-w-[600px] text-gray-500 text-lg">
            The beta program is an early preview of the software to a selected
            individuals before its fully launched to public for testing and
            feedback purposes
            <br /> If you would like to be part of this beta program to test out
            Mail 2 in school <bold className="font-bold">
              this 3rd term
            </bold>{' '}
            please join our whatsApp group links below.
          </p>
          <Link href="https://chat.whatsapp.com/Fk1i49ipQowKt8g7gV0s9d">
            <a>
              <button className="btn-secondary">Join Beta</button>
            </a>
          </Link>
        </div>
      </section>
      <footer className="flex py-16 px-4 justify-between text-lg  text-gray-500">
        <p>© mail 2</p>{' '}
        <ul className="flex gap-4 text-2xl">
          <li>
            <a href="#">
              <FaWhatsapp />
            </a>
          </li>
          <li>
            <a href="#">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="#">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
