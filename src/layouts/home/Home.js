import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getWeb3 } from '../../components/ethereum/reducer'
import { TextField, RaisedButton } from 'material-ui'
import dispatch from '../../util/dispatch'
import { showNotification } from '../../components/notifications/reducer'

class Home extends Component {
  constructor(props) { 
    super(props) 
    const initialState = { 
      hubAddress: '', 
      dictatorHubAddress: '', 
    } 
    this.state = initialState 
  } 
 
  
  handleAddressChange = (e) => {
    this.setState({hubAddress: e.target.value}) 
  }
  handleDictatorAddressChange = (e) => {
    this.setState({dictatorHubAddress: e.target.value}) 
  }
  render() {
    const { hubAddress, dictatorHubAddress } = this.state
    const { web3 } = this.props
    const networkId = web3.version.network
    if (networkId !== '5777') dispatch(showNotification(`MetaMask not connected to Ganache with networkId 5777, instead at ${networkId} - transact at your own risk`, 'warning'))
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div>
              <span>Visit Hub @ </span>
              <TextField
                name="hub_address"
                placeholder="0xdd90c..."
                value={hubAddress}
                onChange={this.handleAddressChange} />
            </div>
            <Link to={`/hub/${hubAddress}`}>
              <RaisedButton primary style={{ color: 'white' }}> Visit Hub </RaisedButton>
            </Link>
          </div>
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'  }}>
            <div>
              <span>Visit Dictator Hub @ </span>
              <TextField
                name="dictator_hub_address"
                placeholder="0xdd90c..."
                value={dictatorHubAddress}
                onChange={this.handleDictatorAddressChange} />
            </div>
            <Link to={`/dictatorHub/${dictatorHubAddress}`}>
              <RaisedButton primary style={{ color: 'white' }}> Visit Hub </RaisedButton>
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    web3: getWeb3(state)
  }
}

export default connect(mapStateToProps, null)(Home)
