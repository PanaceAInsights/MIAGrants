/* Shared filter engine for the Funding Compass directory pages. */

const BADGE = {
  'DIRECT':'b-direct','OPEN':'b-open','PARTNER':'b-partner','WARM INTRO':'b-warm',
  'LOCAL ENTITY':'b-local','CLOSED':'b-closed','CHANGING':'b-changing'
};

function uniq(list, key){
  const seen = [];
  list.forEach(x => { const v = x[key]; if (v && !seen.includes(v)) seen.push(v); });
  return seen;
}

function buildChips(hostId, values, state, onChange, label){
  const host = document.getElementById(hostId);
  if(!host) return;
  host.innerHTML = '';
  if(label){
    const l = document.createElement('span');
    l.className = 'chiplbl'; l.textContent = label;
    host.appendChild(l);
  }
  values.forEach(v => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.type = 'button';
    b.textContent = v;
    b.setAttribute('aria-pressed','false');
    b.onclick = () => {
      state.has(v) ? state.delete(v) : state.add(v);
      b.setAttribute('aria-pressed', state.has(v));
      onChange();
    };
    host.appendChild(b);
  });
}

function initDirectory(cfg){
  const data = cfg.data;
  const fCat = new Set(), fVer = new Set(), fTag = new Set();
  let q = '', sortBy = 'default';

  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const countEl = document.getElementById('count');

  const cats = uniq(data,'cat');
  const vers = uniq(data,'verdict');
  const tagPool = [];
  data.forEach(x => (x.tags||[]).forEach(t => { if(!tagPool.includes(t)) tagPool.push(t); }));
  const topTags = tagPool.filter(t =>
    data.filter(x => (x.tags||[]).includes(t)).length >= 2
  ).sort();

  buildChips('cat-chips', cats, fCat, render, 'Category');
  buildChips('ver-chips', vers, fVer, render, cfg.verdictLabel || 'Eligibility');
  buildChips('tag-chips', topTags, fTag, render, 'Tag');

  const search = document.getElementById('q');
  if(search) search.addEventListener('input', e => { q = e.target.value; render(); });

  const sortSel = document.getElementById('sort');
  if(sortSel) sortSel.addEventListener('change', e => { sortBy = e.target.value; render(); });

  const resetBtn = document.getElementById('reset');
  if(resetBtn) resetBtn.addEventListener('click', () => {
    fCat.clear(); fVer.clear(); fTag.clear(); q = '';
    if(search) search.value = '';
    document.querySelectorAll('.chip[aria-pressed]').forEach(c => c.setAttribute('aria-pressed','false'));
    render();
  });

  function matches(x){
    if(fCat.size && !fCat.has(x.cat)) return false;
    if(fVer.size && !fVer.has(x.verdict)) return false;
    if(fTag.size && !(x.tags||[]).some(t => fTag.has(t))) return false;
    if(q){
      const hay = [x.n,x.org,x.amount,x.note,x.cat,x.verdict,x.stage,x.timing,x.access,(x.tags||[]).join(' ')]
        .filter(Boolean).join(' ').toLowerCase();
      if(!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  }

  function render(){
    let out = data.filter(matches);

    if(sortBy === 'urgent') out = out.slice().sort((a,b)=>(b.urgent?1:0)-(a.urgent?1:0));
    else if(sortBy === 'name') out = out.slice().sort((a,b)=>a.n.localeCompare(b.n));
    else if(sortBy === 'open') {
      const rank = v => ({'DIRECT':0,'OPEN':0,'CHANGING':1,'PARTNER':2,'WARM INTRO':2,'LOCAL ENTITY':3,'CLOSED':4}[v] ?? 5);
      out = out.slice().sort((a,b)=>rank(a.verdict)-rank(b.verdict));
    }

    grid.innerHTML = '';
    out.forEach(x => {
      const el = document.createElement('div');
      el.className = 'card' + (x.urgent ? ' urgent' : '');
      const title = x.url
        ? `<a href="${x.url}" target="_blank" rel="noopener">${x.n}</a>`
        : x.n;
      const timeTag = x.timing
        ? `<span class="tag time${x.urgent?' soon':''}">${x.timing}</span>` : '';
      const stageTag = x.stage ? `<span class="tag stage">${x.stage}</span>` : '';
      const accessTag = x.access ? `<span class="tag">${x.access}</span>` : '';
      const modelTag = x.model ? `<span class="tag">${x.model}</span>` : '';
      el.innerHTML = `
        <div class="card-top">
          <div><div class="name">${title}</div><div class="org">${x.org}</div></div>
          <span class="badge ${BADGE[x.verdict]||''}">${x.verdict}</span>
        </div>
        <div class="amount">${x.amount||''}</div>
        <div class="note">${x.note||''}</div>
        <div class="meta">
          ${timeTag}${stageTag}${modelTag}${accessTag}
          ${(x.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>`;
      grid.appendChild(el);
    });

    empty.hidden = out.length > 0;
    if(countEl) countEl.textContent = out.length + ' of ' + data.length;
  }

  render();
}
