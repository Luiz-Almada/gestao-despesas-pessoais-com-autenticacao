import { Box, Button, TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { IUser, signInEndpoint } from "./backend";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgb(253,236,234)",
    boderRadius: "4px",
    padding: "16px",
    margin: "16px 0",
  },
});

interface ITelaLoginProps {
  onSignIn: (User: IUser) => void;
}

export function TelaLogin(props: ITelaLoginProps) {
  const classes = useStyles();
  const [email, setEmail] = useState("usuario@email.com");
  const [senha, setSenha] = useState("1234");
  const [erro, setErro] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, senha).then(
      (user) => props.onSignIn(user),
      (e) => setErro("E-mail não encontrado ou senha incorreta.")
    );
  }

  return (
    <Container maxWidth="sm">
      <h1>Despesas React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o
        <br />
        e-mail <kbd>usuario@email.com</kbd> e a senha <kbd>1234</kbd> ou
        <br />
        e-mail <kbd>usuario2@email.com</kbd> e a senha <kbd>react</kbd>
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-Mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          type="password"
          margin="normal"
          label="Senha"
          fullWidth
          variant="outlined"
          value={senha}
          onChange={(evt) => setSenha(evt.target.value)}
        />
        <div>
          {erro && <div className={classes.error}>{erro}</div>}
          <Box textAlign="right" marginTop="16px">
            <Button type="submit" variant="contained" color="primary">
              Entrar
            </Button>
          </Box>
        </div>
      </form>
    </Container>
  );
}
