import React, { Component } from 'react';
import { Spinner, HeaderDetails, ActorList } from '../components';
import axios from 'axios';
import { API_URL, API_KEY } from '../config';
import { renderLogin } from '../utils/helper';

const flag = renderLogin();

class Details extends Component {

    state = {
        loading: true, 
        actors: [],
    mTitle: "",
    mDesc: "",
    imgSrc: "",
    revenue: "",
    runtime: "",
    status: "",
    vote: "",
    flag: flag
    }
//componentDidMount et componentDidUpdate sont similaire au useEffect dans les hooks
    async componentDidMount(){
        try{
           if(!this.state.flag){
               this.props.history.push({pathname: '/login'});
               return;
           }
           const idMovie = this.props.match.params.id;
           const url = `${API_URL}/movie/${idMovie}?api_key=${API_KEY}&language=fr`;
           const {data : {
             revenue, 
             runtime, 
             title,
             overview,
             status,
             vote_average,
             poster_path
            }
        } = await this.loadInfos(url);
           this.setState({
               loading: false,
               revenue,
               runtime,
               mTitle: title,
               mDesc: overview,
               status,
               vote: vote_average,
               imgSrc: poster_path
            }, async () => {
                const url = `${API_URL}/movie/${idMovie}/credits?api_key=${API_KEY}&language=fr`;
                const { data:{cast} } = await this.loadInfos(url);
                this.setState({ actors: [...cast], loading: false })
                

            });
           
        }catch(e){
           console('e', e);
        }
    }

    loadInfos = url => axios.get(url);

    render() {
        const { loading, mTitle, mDesc, actors, imgSrc, revenue, runtime, status, vote } = this.state;
        return (<div className="app">
            {loading ? (
                <Spinner />
            ): (<div>
                <h2>Je suis le composant details</h2>
                <HeaderDetails mTitle={mTitle}
                               mDesc={mDesc}
                               imgSrc={imgSrc}
                               runtime={runtime}
                               revenue={revenue}
                               status={status}
                               vote={vote}
                               />
                <ActorList actors={actors}/>
            </div>)}
        </div>)
    }
}

export {Details};