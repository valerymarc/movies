import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import{ Header, Spinner} from './components';
import { Home, Details, NotFound, MoviePlayer, Login, Payment } from './pages'; 
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE } from './config';
import {initFirebase} from './utils/firebase-config';
import './App.css';



class App  extends Component {
  state = {
    loading: false,
    movies: [],
    badge: 15,
    image: null,
    mTitle: "",
    mDes: "",
    activePage: 0,
    totalPage: 0,
    searchText: ""

  }
  async componentDidMount(){
     try{
        initFirebase();
        const {data : {results, page, total_pages}} = await this.loadMovies()
        console.log('rest', results);
        this.setState({
          movies: results,
          loading: false,
          activePage: page,
          totalPage: total_pages,
          image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
          mTitle: results[0].title,
          mDesc: results[0].overview
        })
     }catch(e){
       console.log('e', e)
     }
  }

  loadMovies = () =>{
    const page = this.state.activePage + 1;
    const url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language-fr`;
    return axios.get(url);
  }

  searchMovie = () =>{
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchText}&language-fr`;
    return axios.get(url);
  }

  handleSearch = value =>{
    //Lancer la recherche ici
    try{
       this.setState({loading: true, searchText: value, image: null}, async () =>{
        const {data : {results, page, total_pages}} = await this.searchMovie();
        console.log('rest', results);
        this.setState({
          movies: results,
          loading: false,
          activePage: page,
          totalPage: total_pages,
          image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
          mTitle: results[0].title,
          mDesc: results[0].overview
        })
       })
    }catch(e){
      console.log('e', e);
    }

    

    console.log('handleSearch', value);
  }

  loadMore = async () => {
    //Lancer une requete ici
    try{
      this.setState({loading: true});
      const {data : {results, page, total_pages}} = await this.loadMovies();
      console.log('rest', results);
      this.setState({
        movies: [...this.state.movies, ...results],
        loading: false,
        activePage: page,
        totalPage: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview
      })
    }catch(e){
        console.log('e', e);
    }
    console.log('load more');
  }


  render(){
    
    return(<Provider store={store}>
    <BrowserRouter>
    <div className="App">
    <Header badge={this.state.badge} />

    {!this.state.image  ? (
      <Spinner />
    ) : (
     <Switch>
      <Route path="/" exact render={()=>(
        <Home 
        {...this.state}
        onSearchClick = {this.handleSearch}
        onButtonClick = {this.loadMore}
        />
      )} />
      <Route path="/player" exact component={MoviePlayer} />
      <Route path="/player/:id" exact component={MoviePlayer} />
      <Route path="/login" exact component={Login} />
      <Route path="/payment" exact component={Payment} />
      <Route path="/:id" exact component={Details} />
      <Route component={NotFound} />
    </Switch>
    )}
    

    </div>
    </BrowserRouter>
    </Provider>);
  }
}

export default App;
