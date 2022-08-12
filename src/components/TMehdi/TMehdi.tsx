import useSWR from 'swr'
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
    hrefImg = data.hrefImg
  }

  return (
    <div
      className="container"
      style={{ margin: 'auto', paddingBottom: '32px' }}
    >
      <div>
        {data && (
          <div>
            <section className="section">
              <article
                data-store-hero="true"
                data-testid="store-hero"
                data-fs-hero="true"
                data-fs-hero-variant="primary"
                data-fs-hero-color-variant="main"
              >
                <div
                  data-hero-image="true"
                  data-testid="store-hero-image"
                  data-fs-hero-image="true"
                >
                  <a href={hrefImg}>
                    <picture
                      data-fs-image="true"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <source
                        media="(min-width: 601px)"
                        srcSet={urlDesktop}
                        width="300px"
                        height="400px"
                      />

                      <source
                        media="(max-width: 600px)"
                        srcSet={urlMobile}
                        width="320px"
                      />

                      <img
                        src="https://cdn.pixabay.com/photo/2022/07/21/06/56/ocean-7335499_1280.jpg"
                        alt="test"
                        width="360w"
                      />
                    </picture>
                  </a>
                </div>
                <header
                  data-hero-heading="true"
                  data-testid="store-hero-heading"
                  data-fs-hero-heading="true"
                  aria-labelledby="hero-heading"
                >
                  <div data-fs-hero-wrapper="true" className="layout__content">
                    <div data-fs-hero-info="true">
                      <h1 id="hero-heading">{title}</h1>
                      <p data-fs-hero-text-body="true">
                        At BaseStore you can shop the best tech of 2022. Enjoy
                        and get 10% off on your first purchase.
                      </p>
                    </div>
                  </div>
                </header>
              </article>
            </section>
          </div>
        )}
        {error && <h1>{error}</h1>}
      </div>
    </div>
  )
}

export default TMehdi
