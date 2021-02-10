import { Button, TextField } from '@material-ui/core';
import axios, { AxiosError } from 'axios';
import React, { Component } from 'react';
import './styles.css';

interface Props {

}

interface State {
    password: string;
    isValidPassword: boolean;
    helperText: string;
}

export class App extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.sendMessage = this.sendMessage.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.state = {
            password: "",
            isValidPassword: true,
            helperText: ""
        }
    }

    sendMessage() {
        axios.post("https://api.atzawada.io/valentines-day/send", {"password": this.state.password}).then(res => {
          this.onSuccessfulSend();  
        }).catch(err => {
            this.onSendError(err);
        })
    }

    onSuccessfulSend() {

    }

    onSendError(err: AxiosError<any>) {
        if (err.response?.status === 401) {
            this.setState({
                isValidPassword: false,
                helperText: "Invalid Password"
            })
        }
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
            isValidPassword: true,
            helperText: ""
        })
    }

    render() {
        return (
            <div style={{height: '100%', width: '100', alignContent: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <p>test</p>
                <div>
                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    // autoComplete="current-password"
                    variant="outlined"
                    onInput={event => this.onPasswordChange(event) }
                    error={!this.state.isValidPassword}
                    helperText={this.state.helperText}
                    />
                </div>
                <div style={{paddingTop: 15}}>
                    <Button variant="contained" 
                            color="primary"
                            onClick={ this.sendMessage }
                            disableElevation>
                        Text Me
                    </Button>
                </div>
            </div>
        );
    }
}
