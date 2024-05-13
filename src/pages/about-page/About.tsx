function About() {
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-3xl font-bold mt-10">About luanblog</h1>
      <div className="flex flex-col items-center mx-[10%] text-lg gap-y-4 md:gap-y-6 lg:gap-y-8 mt-8">
        <p>
          Welcome to our global community blog, where individuals from all
          corners of the world come together to share valuable information and
          insights. Whether you're passionate about technology, art, culture, or
          anything in between, this platform is designed to foster knowledge
          exchange and meaningful connections.
        </p>
        <p>
          Here, you can discover a diverse range of perspectives and learn from
          experiences that span different cultures and backgrounds. From
          practical tips and tutorials to thought-provoking discussions and
          personal stories, our blog is a hub of creativity and learning. Join
          us in exploring the richness of human knowledge and experience.
          Together, we can build bridges of understanding and make this world a
          little smaller and brighter through the power of shared information.
        </p>
        <img
          src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.webp"
          alt="Blog image"
          className="max-w-[500px] md:max-w-[800px]  lg:max-w-[1100px] mt-8"
        />
      </div>
    </div>
  );
}

export default About;
