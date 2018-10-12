import React from 'react';

export default class Info extends React.Component {

    render() {
        return(
            <div>
                <div>
                    this is dynamic page {this.props.match.params.mainId}
                </div>
            </div>
        )
    }

}