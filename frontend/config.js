import { http, createConfig } from 'wagmi'
import { base, mainnet, liskSepolia } from 'wagmi/chains'
import { injected} from 'wagmi/connectors'



export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [liskSepolia]: http()
  },
})