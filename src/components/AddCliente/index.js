import React, { Component } from "react";
import "./AddCliente.css";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import * as cpf from "@fnando/cpf";

function dig(n1, n2, n3, n4) {
  const nums = n1.split("").concat(n2.split(""), n3.split(""));
  if (n4 !== undefined) {
    nums[9] = n4;
  }

  let x = 0;
  for (let i = n4 !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
    // eslint-disable-next-line
    x += parseInt(nums[j]) * i;
  }

  const y = x % 11;
  return y < 2 ? 0 : 11 - y;
}

function aleatorio() {
  const aleat = Math.floor(Math.random() * 999);
  return ("" + aleat).padStart(3, "0");
}

class AddCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clienteAtual: {
        email: "",
        cpf: "",
      },
      aleatorio: false,
    };
  }

  generateCpf = () => {
    const n1 = aleatorio(),
      n2 = aleatorio(),
      n3 = aleatorio(),
      d1 = dig(n1, n2, n3);
    return `${n1}.${n2}.${n3}-${d1}${dig(n1, n2, n3, d1)}`;
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    const clienteAtual = { ...this.state.clienteAtual, [name]: value };
    if (this.state.aleatorio) {
      this.setState({ clienteAtual: { email: clienteAtual.email } });
    } else {
      this.setState({ clienteAtual });
    }
  };

  handleCpfGen = () => {
    const cpfField = document.querySelector('input[name="cpf"]');
    const newCpf = cpf.generate();
    console.log(newCpf);
    this.setState({ aleatorio: true });
    cpfField.value = newCpf;
    this.setState({ clienteAtual: { cpf: newCpf.toString() } });
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
              maxLength="11"
              defaultValue={this.state.clienteAtual.cpf}
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
                const newEmail = document.querySelector(
                  'input[name="email"]'
                ).value;
                const cpf = document.querySelector('input[name="cpf"]').value;
                this.setState({ clienteAtual: { email: newEmail, cpf: cpf } });
                console.log(this.state);
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
