import { useWalletLogin } from '@lens-protocol/react-web'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


export default function LoginButton () {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin()

  const { isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const { connectAsync } = useConnect({
    connector: new InjectedConnector()
  })

  async function onLoginClick() {
    if (isConnected) await disconnectAsync()

    const { connector } = await connectAsync()

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner()
      await login(signer)
    }
  }

  return (
    <div>
      {loginError && <p>{loginError}</p>}
      <button disabled={isLoginPending} onClick={onLoginClick}>Log in</button>
    </div>
  )
}