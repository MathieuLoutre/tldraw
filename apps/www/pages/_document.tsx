import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { getCssText } from 'styles'

class MyDocument extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const initialProps = await NextDocument.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </>
      ),
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
