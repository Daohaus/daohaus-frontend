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
import { showNotification } from '../../components/notifications/reducer';

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
    requestMembers: () => dispatch(requestMembers(params.address)),
    requestProposals: () => dispatch(requestProposals(params.address)),
    showNotification: (message, type) => dispatch(showNotification(message,type))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Hub)
