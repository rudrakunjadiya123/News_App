import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `News Daily ${this.props.category[0].toUpperCase() + this.props.category.substr(1)}`
    }
    async componentDidMount()//This method used for execute the code after completion of render() function.
    {
        let url = `https://newsapi.org/v2/everything?q=tesla&from=2025-02-17&sortBy=publishedAt&apiKey=df29eac53c394c2890acfbf02c5d2f90`;
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
        })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37a04d15bb77463784ab2ac646edbdcb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
        })
    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) { }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37a04d15bb77463784ab2ac646edbdcb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url)
            let parsedData = await data.json()

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false,
                totalResults: parsedData.totalResults
            })
        }
    }
    render() {
        return (
            <div className="container my-5">
                {/* {this.state.loading && <Spinner />} */}


                {/* <InfiniteScroll dataLength={this.state.articles.lenght} */}
                {/* next={this.fetchMoreData} */}
                {/* hasMore={this.state.articles.length !== this.totalResults} */}
                {/* loader={<Spinner />}> */}
                <div className="row">
                    {!this.state.loading &&
                        this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })
                    }

                </div>
                {/* </InfiniteScroll> */}

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1 || this.state.loading} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) || this.state.loading} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div >
        )
    }
}

export default News