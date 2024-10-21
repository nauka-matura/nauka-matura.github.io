window.addEventListener('load', () => {
  let time = 0;

  let lastTimestamp = null;

  const createElement = (src, centered) => {
    const element = {
      src: src,
      x: 0,
      y: 0,
      centered: false,
      reposition: () => {
        const x = (element.x + 1) * (window.innerWidth / 2) - (centered ? src.clientWidth / 2 : 0);
        const y = (element.y + 1) * (window.innerHeight / 2) - (centered ? src.clientHeight / 2 : 0);

        src.style.left = `${x}px`;
        src.style.top = `${y}px`;
      },
      setPosition: (newX, newY) => {
        element.x = newX;
        element.y = newY;
        element.reposition();
      }
    };

    return element;
  };

  //Title
  const elements = {
    //Page 1
    titleCard: createElement(document.getElementById('title-card'), true),
    absDescriptionCard: createElement(document.getElementById('abs-description-card'), true),
    absFormulaCard: createElement(document.getElementById('abs-formula-card'), true),
    
    //Page 2
    absExpressionsDescriptionCard: createElement(document.getElementById('abs-expressions-description-card'), true),

    //Page 3
    rootsDescriptionCard: createElement(document.getElementById('roots-description-card'), true),
  };

  const examplePositiveNumber = Math.floor(1 + Math.random() * 10);
  const exampleNegativeNumber = -Math.floor(1 + Math.random() * 10);

  const example1_a = Math.floor(1 + Math.random() * 10);
  const example1_b = Math.floor(1 + Math.random() * 10);

  const example2_a = -Math.floor(1 + Math.random() * 10);
  const example2_b = -Math.floor(1 + Math.random() * 10);

  const example3_a = Math.floor(1 + Math.random() * 10);
  const example3_b = -(example3_a + Math.floor(1 + Math.random() * 10));

  const example4_a = Math.floor(1 + Math.random() * 10);
  const example4_b = Math.floor(1 + Math.random() * 10);

  const example5_a = Math.floor(1 + Math.random() * 10);
  const example5_b = Math.floor(1 + Math.random() * 10);

  document.getElementById('example-positive-number').textContent = `${examplePositiveNumber}`;
  document.getElementById('example-positive-number-result').textContent = `${Math.abs(examplePositiveNumber)}`;

  document.getElementById('example-negative-number').textContent = `${exampleNegativeNumber}`;
  document.getElementById('example-negative-number-result').textContent = `${Math.abs(exampleNegativeNumber)}`;

  document.getElementById('example-1-a').textContent = `${example1_a}`;
  document.getElementById('example-1-b').textContent = `${example1_b}`;
  document.getElementById('example-1-result-1').textContent = `${example1_a + example1_b}`;
  document.getElementById('example-1-result-2').textContent = `${Math.abs(example1_a + example1_b)}`;

  document.getElementById('example-2-a').textContent = `${example2_a}`;
  document.getElementById('example-2-b').textContent = `${example2_b}`;
  document.getElementById('example-2-result-1').textContent = `${example2_a + example2_b}`;
  document.getElementById('example-2-result-2').textContent = `${Math.abs(example2_a + example2_b)}`;

  document.getElementById('example-3-a').textContent = `${example3_a}`;
  document.getElementById('example-3-b').textContent = `${example3_b}`;
  document.getElementById('example-3-result-1').textContent = `${example3_a + example3_b}`;
  document.getElementById('example-3-result-2').textContent = `${Math.abs(example3_a + example3_b)}`;

  document.getElementById('example-4-a').textContent = `√${example4_a}`;
  document.getElementById('example-4-b').textContent = `${example4_b}`;
  document.getElementById('example-4-result-a').textContent = `√${example4_a}`;
  document.getElementById('example-4-result-b').textContent = `${example4_b}`;

  document.getElementById('example-5-a').textContent = `-${example5_a}`;
  document.getElementById('example-5-b').textContent = `-√${example5_b}`;
  document.getElementById('example-5-result-a').textContent = `-${example5_a}`;
  document.getElementById('example-5-result-b').textContent = `-√${example5_b}`;

  const repositionAll = () => {
    for (const element of Object.values(elements)) {
      element.reposition();
    }
  };

  window.addEventListener('resize', () => {
    repositionAll();
  });

  repositionAll();
  setTimeout(() => {
    repositionAll();
  }, 1000);

  let currentStep = 0;
  let currentCall = 0;
  let currentStepTimestamp = 0;

  const handleStep = (stepTime, handler) => {
    if (currentCall === currentStep) {
      const nextStepTimestamp = currentStepTimestamp + stepTime;
      if (time >= nextStepTimestamp) {
        currentStep++;
        currentStepTimestamp = nextStepTimestamp;
      } else {
        handler(time - currentStepTimestamp);
      }
    }

    currentCall++;
  };
  
  let currentPage = 0;

  const nextPage = () => {
    currentPage++;

    currentStep = 0;
    currentCall = 0;
    currentStepTimestamp = time;
  };

  document.getElementById('next-1').addEventListener('click', nextPage);
  document.getElementById('next-2').addEventListener('click', nextPage);

  const handlePage1 = () => {
    //Step 1: Wait 3 seconds
    handleStep(3, () => {
    });

    //Step 2: Move the title up
    handleStep(2, (timestamp) => {
      elements.titleCard.setPosition(0, 0 - (timestamp / 2) * 2);
    });

    //Step 3: Make the description card visible and wait 3 seconds
    handleStep(3, () => {
      elements.absDescriptionCard.src.style.visibility = 'visible';
    });

    //Step 4: Move the description card
    handleStep(2, (timestamp) => {
      elements.absDescriptionCard.setPosition(0, 0 - (timestamp / 2) * 0.75);
    });

    //Step 5: Make the formula card visible and wait 3 seconds
    handleStep(3, () => {
      elements.absFormulaCard.src.style.visibility = 'visible';
    });
  };

  const handlePage2 = () => {
    //Step 1
    handleStep(3, () => {
      elements.titleCard.src.style.visibility = 'hidden';
      elements.absDescriptionCard.src.style.visibility = 'hidden';
      elements.absFormulaCard.src.style.visibility = 'hidden';

      elements.absExpressionsDescriptionCard.src.style.visibility = 'visible';
    });
  };

  const handlePage3 = () => {
    //Step 1
    handleStep(3, () => {
      elements.absExpressionsDescriptionCard.src.style.visibility = 'hidden';

      elements.rootsDescriptionCard.src.style.visibility = 'visible';
    });
  };

  const handlePage4 = () => {

  };

  const handleAnimationFrame = (timestamp) => {
    currentCall = 0;

    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
      window.requestAnimationFrame(handleAnimationFrame);

      return;
    }

    const delta = (timestamp - lastTimestamp) * 0.001;
    lastTimestamp = timestamp;

    time += delta;

    if (currentPage === 0) {
      handlePage1();
    }

    if (currentPage === 1) {
      handlePage2();
    }

    if (currentPage === 2) {
      handlePage3();
    }

    if (currentPage === 4) {
      handlePage4();
    }

    window.requestAnimationFrame(handleAnimationFrame);
  };

  window.requestAnimationFrame(handleAnimationFrame);
});