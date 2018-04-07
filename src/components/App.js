import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import './App.css';
import { getFirebaseConfig } from '../helpers/config'
import Bet from './Bet';

class App extends Component {
  constructor() {
    super();

    // Initialize Firebase
    if (!firebase.apps.length) {
        const config = getFirebaseConfig();
        firebase.initializeApp(config);
    }

    this.betsRef = firebase.firestore().collection('bets');
    this.state = {
      fetching: false,
      docs: []
    };
  }

  componentDidMount() {
    this.unsubscribeCollection = this.betsRef.onSnapshot(this.onCollectionUpdate);
    this.setState({fetching: true});
  }

  componentWillUnmount() {
    this.unsubscribeCollection();
  }

  render() {
    const bets = this.state.docs;
    return (
      <div>
        {JSON.stringify(this.state, 2, null)}         
        <ul>
          {bets.map((doc) => <Bet doc={doc} key={doc.id} />)}
        </ul>
      </div>
    )
  }

  onCollectionUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      docs: docs,
      fetching: false
    });
  };
}

export default App;
