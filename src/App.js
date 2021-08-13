import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import AddCliente from "./components/AddCliente";
import validator from "validator";
import * as cpf from "@fnando/cpf";

import ClearIcon from "@material-ui/icons/Clear";
import { AccountCircle } from "@material-ui/icons";

import Logo from "./media/logo.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.addCliente = this.handleAdd.bind(this);
    this.state = {
      clientes: [],
      err: {
        email: "",
        cpf: "",
        show: false,
      },
    };
  }

  componentDidMount() {
    this.atualizaLista();
  }

  atualizaLista = () => {
    axios
      .get("http://127.0.0.1:8000/api/clientes/")
      .then((res) => this.setState({ clientes: res.data }))
      .catch((err) => console.error(err));
  };

  handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/clientes/${id}/`).then((res) => {
      this.setState({ err: { email: "", cpf: "", show: false } });
      this.atualizaLista();
    });
  };

  handleAdd = (cliente) => {
    if (validator.isEmail(cliente.email) && cpf.isValid(cliente.cpf)) {
      axios
        .post(`http://127.0.0.1:8000/api/clientes/`, cliente)
        .then((res) => {
          this.setState({ err: { email: "", cpf: "", show: false } });
          this.atualizaLista();
        })
        .catch((err) => {
          let eEmail =
            err.response.data.email.toString() ===
            "cliente with this email already exists."
              ? "Já existe um cliente com esse email"
              : err.response.data.email;
          eEmail =
            eEmail === "This field may not be blank."
              ? "Insira um email"
              : eEmail;
          let eCpf = err.response.data.cpf ? err.response.data.cpf : "";
          eCpf =
            eCpf.toString() === "This field may not be blank."
              ? "Insira um CPF"
              : eCpf;
          this.setState({ err: { email: eEmail, cpf: eCpf, show: true } });
        });
    } else {
      if (!validator.isEmail(cliente.email)) {
        this.setState({ err: { email: "Email Inválido", show: true } });
      } else {
        this.setState({ err: { cpf: "CPF inválido", show: true } });
      }
    }
  };

  renderClientes = () => {
    const clientes = this.state.clientes;
    if (clientes.length > 0) {
      return clientes.map((cliente) => (
        <div key={cliente.id} className="App-cliente">
          <span className="Cliente-account">
            <AccountCircle />
          </span>
          <div className="Cliente-info">
            <span className="Cliente-email">{cliente.email}</span>
            <span className="Cliente-cpf">{cpf.format(cliente.cpf)}</span>
          </div>
          <button
            className="App-btn-delete"
            onClick={() => this.handleDelete(cliente.id)}
          >
            <ClearIcon />
          </button>
        </div>
      ));
    } else {
      return (
        <span style={{ display: "block", width: "100%", textAlign: "center" }}>
          Nenhum cliente adicionado
        </span>
      );
    }
  };

  render() {
    return (
      <main className="App">
        <div className="App-box">
          {this.state.err.show && (
            <div className="App-error">
              {this.state.err.email && (
                <span className="Error-email">{this.state.err.email}</span>
              )}
              {this.state.err.cpf && (
                <span className="Error-cpf">{this.state.err.cpf}</span>
              )}
            </div>
          )}
          <div className="App-logo">
            <img src={Logo} alt="Frexco" />
          </div>
          <AddCliente addCliente={this.addCliente} />
          <div className="App-ListaClientes">{this.renderClientes()}</div>
          <div className="footer-msg">
            feito por Ramon Metzker
            <span role="img" aria-label="foguete">
              🚀
            </span>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
