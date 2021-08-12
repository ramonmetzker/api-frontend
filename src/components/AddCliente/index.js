import React, { Component } from "react";
import "./AddCliente.css";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import * as cpf from "@fnando/cpf";

class AddCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clienteAtual: {
        email: "",
        cpf: "",
      },
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const clienteAtual = { ...this.state.clienteAtual, [name]: value };
    this.setState({ clienteAtual });
  };

  handleCpfGen = () => {
    const cpfField = document.querySelector('input[name="cpf"]');
    const newCpf = cpf.generate();

    cpfField.value = newCpf;
  };

  render() {
    return (
      <div className="AddCliente">
        <span className="Add-title">Adicionar Cliente</span>
        <div className="AddCliente-container">
          <div className="inputs">
            <input
              type="text"
              name="email"
              className="AddCliente-email"
              onChange={this.handleChange}
              value={this.state.clienteAtual.email}
              placeholder="Email"
            />
            <input
              type="text"
              name="cpf"
              className="AddCliente-cpf"
              onChange={this.handleChange}
              maxLength="11"
              value={this.state.clienteAtual.cpf}
              placeholder="CPF"
            />
            <div className="CpfGen" onClick={() => this.handleCpfGen()}>
              <AutorenewIcon />
            </div>
          </div>

          <div className="buttons">
            <button
              className="AddCliente-btn"
              onClick={() => {
                this.props.addCliente(this.state.clienteAtual);
              }}
            >
              <AddCircleIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCliente;
