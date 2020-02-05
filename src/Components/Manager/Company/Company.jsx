import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as companyActions from '../../../Actions/company';
import SingleCompany from './SingleCompany';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

class Company extends Component {

    componentDidMount() {
        this.props.getCompanies()
    }

    render() {
        return (
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
              <h1 className="title_addnew">QUẢN LÝ NHÀ XE</h1>
              <Button variant="contained" color="primary"
                onClick={() => this.props.history.push("/manager/companies/addcompany")}
              >
                Thêm Nhà xe
             </Button>
                {this.props.companies.map((company, index) => {
                    return (
                    <SingleCompany 
                      company={company} 
                      key= {index} 
                      deleteCompany={this.props.deleteCompany}/>
                    )
                })}
              
            </Container>
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        companies: state.companies
    }
}

export default connect(mapStateToProps, companyActions)(Company)