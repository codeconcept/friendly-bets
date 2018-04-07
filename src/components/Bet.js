import React from 'react';

class Bet extends React.Component {
    render() {
        console.log(this.props);
        const {doc} = this.props;
        const {title, betisopen} = doc.data;
        return (
            <li>{title} <span>{betisopen ? `(en cours)` : `(terminé)`}</span></li>
        )
    }
  }

  export default Bet;