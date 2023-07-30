import Box from "@material-ui/core/Box";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExibicaoTotal from "./ExibicaoTotal";
import SelecaoAnoMes from "./SelecaoAnoMes";
import TabelaDespesas from "./TabelaDespesas";
import { Despesa, carregaDespesas } from "./backend";

function TelaDespesas() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
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
      <Box display="flex">
        <Box flex="1" padding="16px">
          <SelecaoAnoMes anoMes={anoMes} onChangeAnoMes={mudaAnoMes} />
        </Box>
        <Box padding="16px">
          <ExibicaoTotal despesas={despesas} />
        </Box>
      </Box>
      <TabelaDespesas despesas={despesas} />
    </div>
  );
}

export default TelaDespesas;
