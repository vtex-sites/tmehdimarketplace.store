import useSWR from 'swr'

type TMehdiVariant =
  | {
      /**
       * The content for the h2 tag.
       */
      title: string
    }
  | {
      /**
       * The content for the h2 tag.
       */
      title: string
    }


export type TMehdiProps = TMehdiVariant


function TMehdi({
  title,
}: TMehdiProps) {

  const { isValidating, data, error } = useSWR('https://swapi.dev/api/people/1', async () => {
    const res = await fetch('https://swapi.dev/api/people/1')
    return await res.json()
  })
  console.log("title: ", title)
  console.log("isValidating: ", isValidating)
  console.log("data: ", data)
  console.log("data.body: ", data ? data.body : "empty")
  console.log("error: ", error)

  if (isValidating) return 'Loading...';
  if (error) return `Error! ${error}`;

  return (
    <div className="container">
      <h2>{title}</h2>
      <div>{data && data.name}</div>
      <div>{data && data.birth_year}</div>
      <div>{data && data.films}</div>
    </div>
  )
}

export default TMehdi
