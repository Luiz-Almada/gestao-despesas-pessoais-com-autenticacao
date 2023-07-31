export interface Despesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IUser {
  name: string;
  email: string;
}

export function carregaDespesas(anoMes: string): Promise<Despesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${anoMes}&_sort=dia`, {
    credentials: "include",
  }).then(handleResponse);
}

export function getDespesasEndpoint(): Promise<Despesa[]> {
  return fetch(`http://localhost:3001/despesas`, {
    credentials: "include",
  }).then(handleResponse);
}

export function signInEndpoint(email: string, senha: string): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error("Erro ao carregar dados.");
  }
}
