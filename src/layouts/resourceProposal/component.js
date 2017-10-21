import React, { Component } from 'react'
import { getStatus } from './utils'
import {
  RaisedButton,
  Card,
  CardText,
  CardActions
} from 'material-ui'
import { FirstLast } from '../../components'
import { Link } from 'react-router'
import styled from 'styled-components'
import Blockies from 'react-blockies';

const StyledItem = styled('span')`
  font-size: 12px;
  text-align: center;
  text-decoration: none;
  padding: 5px 10px;
  color: black;
  display: flex;
  justify-content: space-between;
  &:nth-child(odd) { background-color: #eee; }
`

class ResourceProposal extends Component {

  componentDidMount() { if (!this.props.resourceProposalInstance) this.props.requestContract() }
  handleYes = () => this.props.castVote(1)
  handleNo = () => this.props.castVote(2)
  executeProposal = () => this.props.executeProposal()

  render() {
    const {
      resourceProposalInstance = {},
      userAddress
    } = this.props
    const {
      address,
      _owner,
      _chairman,
      _chairmanFee,
      _deadline,
      _projectCost,
      _proposalText,
      _status,
      _votes
    } = resourceProposalInstance

    console.log("VOTE B", _votes);
    if (!address) return <span> Loading...</span>
    const isChairman = userAddress === _chairman
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: "center", flexDirection: 'column' }}>
            <h2 style={{textAlign: 'center', margin: '20px 0 0'}}>Resource Proposal</h2>
            <h2 style={{margin: '0'}}> {address.substring(0, 5)}//{address.slice(-3)}</h2>
            <Card style={{ width: '320px', marginTop: '30px' }}>
              <CardText>
                <h3 style={{ margin: '0', textAlign: 'center', marginBottom: '10px' }}>{_proposalText}</h3>
                <StyledItem> <span>Proposal Cost:</span><span> {_projectCost}</span></StyledItem>
                <StyledItem> <span>Chairman Fee:</span><span> {_chairmanFee}</span></StyledItem>
                <StyledItem> <span>Chairman:</span><span> {FirstLast(_chairman)}</span></StyledItem>
                <StyledItem> <span>Blocks Until Close:</span><span> {_deadline}</span></StyledItem>
                <StyledItem> <span>Parent Hub:</span><Link to={`/hub/${_owner}`} > {FirstLast(_owner)}</Link></StyledItem>
              </CardText>

                <CardActions style={{marginBottom: '15px', display: 'flex', justifyContent: 'space-around'}}>
                  <RaisedButton style={{color: 'white'}} secondary onClick={this.handleNo}> No</RaisedButton>
                  <RaisedButton style={{color: 'white'}} primary onClick={this.handleYes}> Yes </RaisedButton>
                </CardActions>
            </Card>
            <h3>Votes</h3>
            {_votes.length ? _votes.map((n, idx) =>
              <Blockies
                key={idx}
                seed={n}
                size={20}
                scale={3}
                style={{ display: 'inline-block', margin: '10px' }}
              />
            ) : null}
            <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ margin: '5px 0' }}>Status: {getStatus(_status)}</div>
              {isChairman && _status==='0' &&
                <RaisedButton
                  primary
                  onClick={this.executeProposal}>
                  <span style={{ color: 'white', margin: '0 15px' }}>Execute Proposal</span>
                </RaisedButton>}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default ResourceProposal
