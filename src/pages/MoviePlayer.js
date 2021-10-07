import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import _ from 'lodash';
import { VideoPlayer, MvPlayerList } from '../components';
import { Spinner } from '../components';
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE } from '../config';
import { calculTime } from '../utils/helper';
import { renderLogin } from '../utils/helper';
import '../css/MoviePlayer.css';


const flag = renderLogin();
let newMovies = [];

class MoviePlayer extends Component {
    state = {
      movies: [],
      selectedMovie: {},
      loading: true, 
      flag: flag
    }
    async componentDidMount(){
       /* if(!this.state.flag){
            this.props.history.push({pathname: '/login'});
            return;
        }*/
        
       setTimeout(() => {
            const user = firebase.auth().currentUser;
            let dbRef;
            if(user){
                dbRef = firebase.database().ref(`users/${user.uid}`);
                dbRef.on('value', async snapshot => {
                    const data = snapshot.val();
                    console.log('data', data);
                    if(data){
                        const targetDate = data.validUntil;
                        const now  = new Date().getTime();
                        if(targetDate > now){
                            console.log("Abonnement valide");
                            //
                            const oldMovies = JSON.parse(localStorage.getItem("movies"));
       const results = await this.getNewMovies(oldMovies);
       newMovies = oldMovies.map((oldMovie, index) => {
           return {
               id: oldMovie.id,
               position: index+1,
               title: oldMovie.title,
               duration: results[index],
               imageUrl: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${oldMovie.backdrop_path}`,
               videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

           }
       });
       const id = this.props.match.params.id;
       if(id){
           const selectedMovie = this.getSelectedMovies(newMovies, id);
           this.setState({ 
               loading: false,
               movies: [...newMovies],
               selectedMovie: selectedMovie
           });
       }else{
        const selectedMovie = newMovies[0];
        this.setState({ 
            loading: false,
            movies: [...newMovies],
            selectedMovie: selectedMovie
        });
        this.props.history.push({
            pathname: `/player/${selectedMovie.id}`
        });
       }
                        }else{
                            this.props.history.push({pathname: '/payment'});
                        }
                    }else{
                        this.props.history.push({pathname: '/payment'});
                    }
                });
            }else{
                this.props.history.push({pathname: '/login'});
            }
       }, 3000);
       

    }


    componentDidUpdate(prevProps){
        console.log('component did update');
        if(prevProps.match.params.id !== this.props.match.params.id){
            const id = this.props.match.params.id;
            const selectedMovie = this.getSelectedMovies(newMovies, id);
            this.setState({selectedMovie});
        }
    }

    //Récuperer les films selectionnés
    getSelectedMovies = (movies, idMovie) =>{
        const selectedMovie = _.find(movies, { id: parseInt(idMovie, 10) });
        return selectedMovie;
        
    
    }


    handleEnded = () =>{
       console.log('video ended');
       const { movies, selectedMovie } = this.state;
       const movieIndex = movies.findIndex(movie => selectedMovie.id === movie.id);
       const nextMoviesIndex = movieIndex === movies.length - 1 ? 0 : movieIndex + 1;
       const newSelectedMovie = movies[nextMoviesIndex];
       this.props.history.push({ pathname: `/player/${newSelectedMovie.id}` });
       this.setState({ selectedMovie : newSelectedMovie });
    }

    //Recuperer la durée du film
    getTime = idMovie =>{
       return new Promise((resolve, reject) => {
        const url = `${API_URL}/movie/${idMovie}?api_key=${API_KEY}&language=fr`;
        axios.get(url)
             .then(response => {
                 const duration = response.data.runtime;
                 resolve(duration);
             })
             .catch(e => {
                 console.log('e', e);
                 reject('error', e)
             })
       });
    }

    //Recupérer les nouveaux films
    getNewMovies = async oldMovies =>{
        let promises = [];
        for(let i=0; i<oldMovies.length; i++){
            const element = oldMovies[i];
            const id = element.id;
            const time = await this.getTime(id);
            promises.push(calculTime(time));
        }
        return Promise.all(promises);
    }
    

    render() {
        const { movies, selectedMovie } = this.state;
        return(<div className="moviePlayer">
            {this.state.loading ? (
                <Spinner />
            ) : (
                <>
                <VideoPlayer
                 videoUrl = {selectedMovie.videoUrl}
                 imageUrl = {selectedMovie.imageUrl}
                 handleEnded = {this.handleEnded}
                />
            <MvPlayerList 
                movies={movies}
                selectedMovie={selectedMovie}
              />
                
                </>
            )}
            
        </div>);
    }
}

export {MoviePlayer};