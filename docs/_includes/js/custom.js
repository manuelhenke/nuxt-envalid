// Choose theme based on system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (event.matches) {
    jtd.setTheme('custom-dark');
  } else {
    jtd.setTheme('custom-light');
  }
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  jtd.setTheme('custom-dark');
}

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Add Copy button to code block
docReady(function () {
  const codeBlocks = document.querySelectorAll('pre.highlight');

  codeBlocks.forEach(function (codeBlock) {
    const copyButton = document.createElement('button');
    copyButton.className = 'btn';
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerText = 'Copy';

    codeBlock.append(copyButton);

    copyButton.addEventListener('click', function () {
      const code = codeBlock.querySelector('code').innerText.trim();
      window.navigator.clipboard.writeText(code);

      copyButton.innerText = 'Copied';
      const fourSeconds = 4000;

      setTimeout(function () {
        copyButton.innerText = 'Copy';
      }, fourSeconds);
    });
  });
});

// Support tabbed code blocks
const removeActiveClasses = function (ulElement) {
  const lis = ulElement.querySelectorAll('li');
  Array.prototype.forEach.call(lis, function(li) {
      li.classList.remove('active');
  });
};

const getChildPosition = (element) => {
      const parent = element.parentNode;
      for (let i = 0; i < parent.children.length; i++) {
          if (parent.children[i] === element) {
              return i;
          }
      }

      throw new Error('No parent found');
  };

window.addEventListener('load', function () {
  const tabLinks = document.querySelectorAll('ul.tab li a');

  Array.prototype.forEach.call(tabLinks, function(link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      liTab = link.parentNode;
      ulTab = liTab.parentNode;
      position = getChildPosition(liTab);
      if (liTab.className.includes('active')) {
        return;
      }

      removeActiveClasses(ulTab);
      tabContentId = ulTab.getAttribute('data-tab');
      tabContentElement = document.getElementById(tabContentId);
      removeActiveClasses(tabContentElement);

      tabContentElement.querySelectorAll('li')[position].classList.add('active');
      liTab.classList.add('active');
    }, false);
  });
});
