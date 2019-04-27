import Layout from '../components/Layout';
import ResultsTable from "../components/ResultsTable";

const Index = (props) => (
    <Layout>
        <div id='foodQueryForm'>
            <div id='idInput'>
                <label htmlFor='foodByID_input'>Food by ID: </label>
                <input id='foodByID_input' type="text"/>
            </div>
            <div id='nameInput'>
                <label htmlFor='foodByName_input'>Food by name: </label>
                <input id='foodByName_input' type='text'/>
            </div>
            <div id='formButtons'>
                <input className='submit' id='getButton' type='submit' value='Get food'/>
                <input className='submit' id='getAllButton' type='submit' value='Get all foods'/>
            </div>
        </div>
        <ResultsTable values={props.foods}/>
    </Layout>
);

Index.getInitialProps = async function () {
    const res = await fetch('http://localhost:3000/api/v1/foods');
    const data = await res.json();

    console.log(`${data.value.length} foods retrieved.`);

    return {
        foods: null,
    }
};

export default Index;
