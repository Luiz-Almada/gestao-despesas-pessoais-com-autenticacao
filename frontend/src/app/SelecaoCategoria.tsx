import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { Despesa, CategoriaComSoma } from './backend';
import TabelaDespesas from "./TabelaDespesas";
import TabelaCategorias from './TabelaCategorias';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function allProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface DespesasProps {
  despesas: Despesa[];
}

export default function SelecaoCategoria(props: DespesasProps, ) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const categoriasComSoma: CategoriaComSoma[] = agruparPorCategoria(props.despesas);
  
  return (
    
    <>
      <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          paddingTop={"40px"}
          style={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Resumo" {...allProps(0)} />
            <Tab label="Detalhe" {...allProps(1)} />
          </Tabs>
        </Box>
      </Box>

      <Box>
        <CustomTabPanel value={value} index={0}>
          <TabelaCategorias categorias={categoriasComSoma} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TabelaDespesas despesas={props.despesas} />
        </CustomTabPanel>
      </Box>
    </>
  );
}

export function agruparPorCategoria(despesas: Despesa[]): CategoriaComSoma[] {
  const categoriasComSoma: CategoriaComSoma[] = [];

  despesas.forEach((despesa) => {
    const categoriaExistente = categoriasComSoma.find(
      (categoria) => categoria.descricao === despesa.categoria
    );

    if (categoriaExistente) {
      categoriaExistente.soma += despesa.valor;
    } else {
      categoriasComSoma.push({
        descricao: despesa.categoria,
        soma: despesa.valor,
      });
    }
  });

  const categoriasComSomaSortValor = categoriasComSoma.sort((a, b) => b.soma - a.soma)
  return categoriasComSomaSortValor;
}