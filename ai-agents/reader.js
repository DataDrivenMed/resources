  function esc(s){
    return s.replace(/[&<>]/g,c=>({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;'
    }[c]))
  }

  const diagramFiles = {
    1: ["01-what-an-ai-agent-actually-is.html", "What an AI agent actually is, and what it isn't"],
    2: ["02-spectrum-from-chatbots-to-agents.html", "The spectrum from chatbots to agents"],
    3: ["03-how-much-independence.html", "How much independence should an agent have?"],
    4: ["04-under-the-hood.html", "Under the hood: models, tools, memory, and orchestration"],
    5: ["05-single-task-workflow.html", "Following an agent through a single task"],
    6: ["06-documentation-and-revenue-cycle.html", "What is actually working now: documentation and the revenue cycle"],
    7: ["07-clinical-work-human-control.html", "Agents in clinical work, and where a human must stay in control"],
    8: ["08-literature-research-education.html", "Agents for literature work, research, and medical education"],
    9: ["09-how-one-error-becomes-many.html", "How agents fail, and how one error becomes many"],
    10: ["10-security-when-software-can-act.html", "Security when software can act"],
    11: ["11-patient-data-regulation-accountability.html", "Patient data, regulation, and who is responsible when an agent is wrong"],
    12: ["12-before-you-trust-an-agent.html", "Before you trust an agent: evaluation, governance, and knowing when to say no"],
    13: ["13-epic-and-vendor-landscape.html", "Epic's agents and the wider vendor landscape"],
    14: ["14-louisiana-health-systems.html", "AI agents in Louisiana health systems"],
    15: ["15-where-this-is-heading.html", "Where this is heading, and what to watch"]
  };

  function diagram(n){
    const item = diagramFiles[n];

    if(!item) return '';

    const [file,title] = item;

    return `
      <div class="diagram">
        <div class="diagram-title">${esc(title)}</div>
        <iframe
          src="../diagrams/${file}"
          title="${esc(title)}"
          loading="lazy"
          style="
            width:100%;
            height:760px;
            border:0;
            border-radius:12px;
            background:#faf9f5;
          ">
        </iframe>
        <p style="font-family:Inter,Arial,sans-serif;font-size:13px;margin:14px 0 0;">
          <a href="../diagrams/${file}" target="_blank" rel="noopener">
            Open diagram in a new tab →
          </a>
        </p>
      </div>
    `;
  }

  function renderBody(b){
    let lines = b.body
      .split(/\n+/)
      .map(x=>x.trim())
      .filter(Boolean);

    let refs = [];
    let p = [];
    let r = false;

    for(const x of lines){
      if(x.toLowerCase()==='references and further reading'){
        r = true;
        continue;
      }

      if(r && /^\[\d+\]/.test(x)){
        refs.push(x.replace(/^\[\d+\]\s*/,''));
        continue;
      }

      if(!r) p.push(x);
    }

    let h = p.map(x =>
      x.startsWith('What to take away:')
        ? `<div class="takeaway"><strong>What to take away</strong><br>${esc(x.slice(18).trim())}</div>`
        : `<p>${esc(x)}</p>`
    );

    if(diagram(b.num)){
      h.splice(1,0,diagram(b.num));
    }

    if(refs.length){
      h.push(`
        <details class="refs">
          <summary>Sources &amp; further reading</summary>
          <ol>
            ${refs.map(x=>`<li>${esc(x)}</li>`).join('')}
          </ol>
        </details>
      `);
    }

    return h.join('');
  }

  function copyLink(){
    navigator.clipboard.writeText(location.href).then(()=>{
      const t = document.querySelector('.toast');
      t.classList.add('show');
      setTimeout(()=>t.classList.remove('show'),1600);
    });
  }

  const b = window.BRIEF;

  document.title = `Brief ${b.num}: ${b.title}`;

  document.querySelector('#meta').innerHTML = `
    <span>Brief ${b.num} of 15</span>
    <span>${b.category}</span>
    <span>${b.read} min read</span>
  `;

  document.querySelector('#title').textContent = b.title;

  document.querySelector('#article').innerHTML = renderBody(b);

  const p = b.prev;
  const n = b.next;

  document.querySelector('#pager').innerHTML = `
    ${
      p
        ? `<a href="../${p.slug}/">
             <small>Previous · Brief ${p.num}</small>
             ${p.title}
           </a>`
        : '<span></span>'
    }
    ${
      n
        ? `<a href="../${n.slug}/">
             <small>Next · Brief ${n.num}</small>
             ${n.title}
           </a>`
        : ''
    }
  `;

  window.addEventListener('scroll',()=>{
    const h = document.documentElement;
    const d = h.scrollHeight - h.clientHeight;

    document.querySelector('.progress').style.width =
      (d ? 100 * h.scrollTop / d : 0) + '%';
  });
