import { ServerStyleSheets } from '@material-ui/core/styles';
import { GA_TRACKING_ID } from 'helpers/constants';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const isProduction = process.env.NODE_ENV === 'production' && process.env.PRODUCTION === 'true';
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      isProduction,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  setGoogleTags() {
    return {
      __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
    };
  }

  render() {
    const { isProduction } = this.props;

    return (
      <Html lang="en">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {isProduction && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
              <script dangerouslySetInnerHTML={this.setGoogleTags()}/>
            </>
          )}
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}
