/* eslint-disable no-console */
import useSWR from 'swr'
// import { Image } from 'src/components/ui/Image'
import { useSession } from '@faststore/sdk'

type TMehdiVariant = {
  /**
   * The content for the h2 tag.
   */
  title: string
}

export type TMehdiProps = TMehdiVariant

const TMehdi = ({ title }: TMehdiProps) => {
  const { person } = useSession()
  let urlDesktop
  let urlMobile
  let hrefImg
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      return res.json()
    })

  const { data, error } = useSWR(
    `https://imageprotocol--lreyes.myvtex.com/_v/image-protocol-example/get-url?userId=${person?.id}&imageProtocolId=beta&latitude=0&longitude=0`,
    fetcher
  )

  if (error) return <h1>An error has occurred</h1>
  if (!data) return <h1>Loading...</h1>

  if (data) {
    urlDesktop = data.url
    urlMobile = data.urlMobile
    hrefImg = data.href
  }

  return (
    <div className="container">
      <h2>{title}</h2>
      <div>
        {data && (
          <div>
            <picture>
              <source media="(min-width: 601px)" srcSet={urlDesktop} />
              <source media="(max-width: 600px)" srcSet={urlMobile} />
              <img
                src="https://cdn.pixabay.com/photo/2022/07/21/06/56/ocean-7335499_1280.jpg"
                alt="test"
              />
            </picture>

            <h1>{urlDesktop}</h1>
            <h1>{urlMobile}</h1>
            <h1>{hrefImg}</h1>
            <p>{person?.id}</p>
          </div>
        )}
        {error && <h1>{error}</h1>}
      </div>
    </div>
  )
}

export default TMehdi
