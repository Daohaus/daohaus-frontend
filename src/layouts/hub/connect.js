import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { 
  requestHub, 
  getHubViaAddress, 
  requestMembers, 
  requestProposals, 
  registerPhone 
} from './reducer'
import { getWeb3 } from '../../components/ethereum/reducer'
import Hub from './component'

const mapStateToProps = (state, ownProps) => {
  const web3 = getWeb3(state)
  return {
    hubInstance: getHubViaAddress(state, ownProps.params.address),
    web3: web3,
    userAddress: web3 && web3.eth.accounts[0]
  }
}

const mapDispatchToProps = (dispatch, { params }) => {
  return {
    requestHub: () => dispatch(requestHub(params.address)),
    registerPhone: (number) => dispatch(registerPhone(params.address, number)),
    requestMembers: () => {console.log('made it'); dispatch(requestMembers(params.address))},
    requestProposals: () => dispatch(requestProposals(params.address))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Hub)
