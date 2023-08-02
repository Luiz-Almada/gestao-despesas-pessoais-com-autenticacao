import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CategoriaComSoma } from "./backend";
import { formataRs } from "./util";

interface TabelaCategoriaProps {
  categorias: CategoriaComSoma[];
}

export default function TabelaCategorias(props: TabelaCategoriaProps) {
  return (
    <TableContainer>
      <Table size="small" aria-label="Tabela de categorias">
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell align="right">Valor (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.categorias.map((categoria) => (
            <TableRow key={categoria.descricao}>
              <TableCell>{categoria.descricao}</TableCell>
              <TableCell align="right">{formataRs(categoria.soma)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
