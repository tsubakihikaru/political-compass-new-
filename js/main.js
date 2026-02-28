const questions = [
  { text: "Marxism is necessary to provide equality and peace to everyone.", axis: "economic", direction: -1, weight: 2 },
  { text: "Personal freedoms must be preserved even if society suffers.", axis: "social", direction: -1, weight: 1 },
  // ... more questions
];
function calculateResults() {
  let economic = 0;
  let social = 0;
  
  questions.forEach((q, i) => {
    const value = parseInt(document.querySelector(`input[name=q${i+1}]:checked`).value);
    if(q.axis === "economic") economic += value * q.direction * q.weight;
    if(q.axis === "social") social += value * q.direction * q.weight;
  });

  // Normalize to -10 → +10
  const maxEconomic = questions.filter(q => q.axis==="economic").reduce((acc,q)=>acc+2*q.weight,0);
  const maxSocial = questions.filter(q => q.axis==="social").reduce((acc,q)=>acc+2*q.weight,0);

  const x = (economic / maxEconomic) * 10;
  const y = (social / maxSocial) * 10;

  plotCompass(x, y);
}
function getQuadrant(x, y){
  let horizontal = x < -5 ? "Far-Left" : x < 0 ? "Moderate-Left" : x < 5 ? "Moderate-Right" : "Far-Right";
  let vertical = y < 0 ? "Libertarian" : "Authoritarian";
  return `${vertical} ${horizontal}`;
}
