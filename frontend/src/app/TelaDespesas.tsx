import Box from "@material-ui/core/Box";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExibicaoTotal from "./ExibicaoTotal";
import SelecaoAnoMes from "./SelecaoAnoMes";
import { Despesa, carregaDespesas } from "./backend";
import SelecaoCategoria from './SelecaoCategoria';
import { UserMenu } from './UserMenu';

function TelaDespesas() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [categorias, setCagorias] = useState<Despesa[]>([]);
  const params = useParams<{ anoMes: string }>();
  const anoMes = params.anoMes || "2021-06";
  const navigate = useNavigate();

  function mudaAnoMes(anoMes: string) {
    navigate(`/despesas/${anoMes}`);
  }

  useEffect(() => {
    carregaDespesas(anoMes).then(setDespesas);
  }, [anoMes]);

  return (
    <div>
      <Box>
        <UserMenu />
      </Box>
      <Box display="flex">
        <Box flex="1" padding="32px">
          <SelecaoAnoMes anoMes={anoMes} onChangeAnoMes={mudaAnoMes} />
        </Box>
        <Box padding="32px">
          <ExibicaoTotal despesas={despesas} />
        </Box>
      </Box>

      <Box>
        <SelecaoCategoria despesas={despesas}/>
      </Box>
    </div>
  );
}

export default TelaDespesas;
