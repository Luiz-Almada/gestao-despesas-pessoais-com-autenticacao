import Button from "@material-ui/core/Button";
import { signOutEndpoint } from "./backend";
import { useAuthContext } from "./authContext";
import Box from "@material-ui/core/Box";

export function UserMenu() {
  const { user, onSignOut } = useAuthContext();

  function signOut() {
    signOutEndpoint();
    onSignOut();
  }

  return (
    <div>
      <Box display="flex" alignItems="center" padding="8px 16px">
        <Box flex="1" padding="16px" fontWeight="bold" fontSize="24px">
          Despesas
        </Box>

        <Box >
          Olá {user.nome}
          <Button style={{marginLeft: "16px"}}
            variant="outlined"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={signOut}
          >
            Sair
          </Button>
        </Box>
      </Box>
    </div>
  );
}
