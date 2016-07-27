import classNames from 'classnames'
import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { renderToString } from 'react-dom/server'

const Html = ({
  assets,
  components,
  initialState
}) => {
  const head = Helmet.rewind()
  const content = (components
    ? renderToString(components)
    : null)

  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />

      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <meta name="author" content="Natcha Luang - Aroonchai" />
      <meta name="description" content="Trust me I'm Petdo" />

      <meta name="theme-color" content="#3e5d6d" />
      <meta name="msapplication-navbutton-color" content="#3e5d6d" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#3e5d6d" />

      { head.title.toComponent() }

      <link rel="icon" href={ require('../images/favicon.ico') } />
      <link rel="icon" type="image/png" sizes="32x32" href={ require('../images/favicon-32x32.png') } />
      <link rel="icon" type="image/png" sizes="96x96" href={ require('../images/favicon-96x96.png') } />
      <link rel="icon" type="image/png" sizes="16x16" href={ require('../images/favicon-16x16.png') } />

      <link rel="stylesheet" href={ assets.styles.preload } />
    </head>
    <body className={ classNames({
        'popup-open': initialState.entities.posts.isPopup
      }) }>
      <div className="preload">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>

      <div id="root" dangerouslySetInnerHTML={ { __html: content } }></div>

      <noscript id="deferred-styles">
        <link rel="stylesheet" href={ assets.styles.postload } />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/9.5.0/styles/solarized-dark.min.css" />
      </noscript>

      <script dangerouslySetInnerHTML={ {
        __html: `
          var loadDeferredStyles = function() {
            var addStylesNode = document.getElementById('deferred-styles')
            var replacement = document.createElement('div')

            replacement.innerHTML = addStylesNode.textContent
            document.body.appendChild(replacement)
            addStylesNode.parentElement.removeChild(addStylesNode)
          }

          var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame
          if (raf) {
            raf(function() {
              window.setTimeout(loadDeferredStyles, 0)
            })
          } else {
            window.addEventListener('load', loadDeferredStyles)
          }
        `
      } }>
      </script>

      <script dangerouslySetInnerHTML={ {
        __html: `
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        `
      } }></script>

      <script dangerouslySetInnerHTML={ {
        __html: `
          var _gaq=[['_setAccount','UA-33411047-1'],['_trackPageview']];
          (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
          g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
          s.parentNode.insertBefore(g,s)}(document,'script'));
        `
      } }></script>

      <script src={ assets.javascript.main }></script>

      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/highlight.min.js"></script>
      <script dangerouslySetInnerHTML={ {
        __html: 'hljs.initHighlightingOnLoad()'
      } }></script>

      <script dangerouslySetInnerHTML={ {
        __html: `/**
          * RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
          * LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
          */
          /*
          var disqus_config = function () {
          this.page.url = PAGE_URL; // Replace PAGE_URL with your page's canonical URL variable
          this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
          };
          */
          (function() { // DON'T EDIT BELOW THIS LINE
          var d = document, s = d.createElement('script');

          s.src = '//nomkhonwaan.disqus.com/embed.js';

          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
          })();`
        } }>
      </script>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
    </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.object,
  components: PropTypes.node,
  initialState: PropTypes.object
}

export default Html
