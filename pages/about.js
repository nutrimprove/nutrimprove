import Layout from '../components/Layout'

const layoutStyle = {
   margin: 20,
   padding: 20,
   border: '1px solid #DDD',
   minWidth: 800,
};

const About = () => {
   return (
      <div id="about" style={layoutStyle}>
         <Layout>
            <p>About Eatwell</p>
         </Layout>
      </div>
   )
};

export default About;