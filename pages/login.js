import { useWalletLogin } from '@lens-protocol/react-web'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'


export default function LoginButton () {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin()

  const { isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const { connectAsync } = useConnect({
    connector: new InjectedConnector()
  })

  async function onLoginClick () {
    if (isConnected) await disconnectAsync()

    const { connector } = await connectAsync()

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner()
      await login(signer)
    }
  }

  return (<>
    {loginError && <p>{loginError}</p>}
    <Button variant='contained' disabled={isLoginPending} onClick={onLoginClick}>Log in</Button>
  </>)
}