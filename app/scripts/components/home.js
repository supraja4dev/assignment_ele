/**
 * This file will hold the Main content that lives in the main body of the site
 * 
 */
import React from 'react';
import Menu from './menu';
import { getSearch } from '../service';



class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            searchKey: "",
            matchData: []
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.timer = null;
    }

    async getmatchData() {
        try {
            let result = await getSearch(this.state.searchKey);
            this.setState({ matchData: result })
        }
        catch (err) {
            console.log(err)
        }
    }
    handleSearch(key) {
        this.setState({ searchKey: key })

    }
    componentDidMount() {
        this.getmatchData()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchKey !== this.state.searchKey) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.getmatchData();
            }, 1000);
        }
    }
    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof Home
    */
    render() {

        return (
            <>
                <Menu handleSearch={this.handleSearch} />
                <section id="home">
                    <div className="content">
                        {this.state.matchData.map((item, key) => {
                            return <h1 key={key}> {item.name}</h1>
                        })}
                    </div>
                </section>
            </>
        );
    }
}


// Export out the React Component
export default Home;