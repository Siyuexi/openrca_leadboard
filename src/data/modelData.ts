export interface Data {
  name: string;
  model: string;
  org: string;
  correct: string;
  date: string;
  frameworkOpen: boolean;
  modelOpen: boolean;
  trajUrl?: string;
}

export interface DataOpenRCA2 {
  name: string;
  model: string;
  modelId?: string;
  f1: string;
  acc: string;
  nodeF1: string;
  edgeF1: string;
  anyHit: string;
  allHit: string;
  pathAcc: string;
  typeAcc: string;
  frameworkOpen: boolean;
  modelOpen: boolean;
  trajUrl?: string;
}

const prefix = import.meta.env.BASE_URL.replace(/\/$/, '')

// 模型颜色映射
export const modelColorMap: { [key: string]: { color: string, backgroundColor: string } } = {
  'Claude 4.6 Opus': { color: '#0d1b4d', backgroundColor: '#9fa8da' },
  'Claude 4.5 Opus': { color: '#283593', backgroundColor: '#c5cae9' },
  'Claude 3.5 Sonnet': { color: '#1a237e', backgroundColor: '#e8eaf6' },
  'GPT-4o': { color: '#004d40', backgroundColor: '#e0f2f1' },
  'GPT-5.2': { color: '#00695c', backgroundColor: '#b2dfdb' },
  'Gemini 1.5 Pro': { color: '#b71c1c', backgroundColor: '#ffebee' },
  'Gemini 3 Pro': { color: '#c62828', backgroundColor: '#ffcdd2' },
  'Mistral Large 2': { color: '#0d47a1', backgroundColor: '#bbdefb' },
  'Command R+': { color: '#4a148c', backgroundColor: '#e1bee7' },
  'Llama 3.1 Instruct': { color: '#e65100', backgroundColor: '#ffe0b2' },
  'GLM-4.7': { color: '#1565c0', backgroundColor: '#bbdefb' },
  'Claude 4.5 Sonnet': { color: '#1a237e', backgroundColor: '#e8eaf6' },
  'GPT-5.1': { color: '#004d40', backgroundColor: '#e0f2f1' },
  'Kimi K2': { color: '#4e342e', backgroundColor: '#d7ccc8' },
  'Qwen3-32B': { color: '#6a1b9a', backgroundColor: '#e1bee7' },
  'Qwen3-Next-80B': { color: '#7b1fa2', backgroundColor: '#f3e5f5' },
  'Seed 1.6': { color: '#33691e', backgroundColor: '#dcedc8' },
  'Claude Fable 5': { color: '#6d3b1f', backgroundColor: '#f4e2d2' },
  'Claude Opus 4.8': { color: '#7f1d1d', backgroundColor: '#fee2e2' },
  'Claude Opus 4.6': { color: '#991b1b', backgroundColor: '#ffe4e6' },
  'Claude Sonnet 5': { color: '#9a3412', backgroundColor: '#ffedd5' },
  'GPT-5.6 Sol': { color: '#064e3b', backgroundColor: '#a7f3d0' },
  'GPT-5.5': { color: '#065f46', backgroundColor: '#d1fae5' },
  'GPT-5.4': { color: '#047857', backgroundColor: '#ccfbf1' },
  'Grok 4.5': { color: '#111827', backgroundColor: '#e5e7eb' },
  'Gemini 3.1 Pro': { color: '#1d4ed8', backgroundColor: '#dbeafe' },
  'Gemini 3.5 Flash': { color: '#2563eb', backgroundColor: '#e0f2fe' },
  'Kimi K2.6': { color: '#3730a3', backgroundColor: '#e0e7ff' },
  'Kimi K2.7 Code': { color: '#4338ca', backgroundColor: '#eef2ff' },
  'Qwen 3.7 Max': { color: '#0f766e', backgroundColor: '#ccfbf1' },
  'Qwen 3.7 Plus': { color: '#115e59', backgroundColor: '#d1fae5' },
  'DeepSeek V4 Pro': { color: '#4338ca', backgroundColor: '#e0e7ff' },
  'DeepSeek V4 Flash': { color: '#312e81', backgroundColor: '#ede9fe' },
  'Seed 2.1 Pro': { color: '#be123c', backgroundColor: '#ffe4e6' },
  'Seed 2.0 Lite': { color: '#c2410c', backgroundColor: '#ffedd5' },
  'GLM-5.2': { color: '#166534', backgroundColor: '#dcfce7' },
  'MiniMax M3': { color: '#86198f', backgroundColor: '#fae8ff' },
  'StepFun 3.7 Flash': { color: '#a16207', backgroundColor: '#fef3c7' },
  'MiMo V2.5 Pro': { color: '#9f1239', backgroundColor: '#ffe4e6' },
  'HY 3.0': { color: '#0e7490', backgroundColor: '#cffafe' },
  'LongCat 2.0': { color: '#92400e', backgroundColor: '#fef3c7' }
};

// 组织图标映射
export const orgLogoMap: { [key: string]: string } = {
  'Microsoft': `${prefix}/ms_logo.svg`,
  'Google': `${prefix}/gemini_logo.png`,
  'OpenAI': `${prefix}/openai_logo.svg`,
  'Anthropic': `${prefix}/anthropic-1.svg`,
  'Meta': `${prefix}/meta_logo.svg`,
  'OpenRCA': `${prefix}/openrca_logo_white.png`,
  'None': '-'
};

// 新闻数据
export const news = [
  {date: '2026/7/13', content: "OpenRCA 2.0 adds GPT-5.6 Sol, Grok 4.5, Hunyuan 3.0, and the latest ops-lite results."},
  {date: '2026/2/23', content: "OpenRCA 2.0 evaluation results are released."},
  {date: '2026/2/10', content: "New model baselines with RCA-Agent scaffolds are released."},
  // {date: '2026/1/17', content: "Anthropic's Claude 4.5 Opus + Claude Agent SDK & SRE Tool MCP achieves SOTA"},
  { date: '2025/12/22', content: 'Our AIOps dataset study paper has been accepted by FSE 2026.' },
  { date: '2025/1/23', content: 'Our OpenRCA benchmark paper has been accepted by ICLR 2025.' }
];

// 模型数据
export const modelDataOpenRCA: Data[] = [
  // { name: 'Claude Agent SDK & SRE Tool MCP', model: 'Claude 4.6 Opus', org: 'Anthropic', correct: '87.46%', date: '2026/2/10', frameworkOpen: false, modelOpen: false, trajUrl: 'https://example.com/traj/claude-agent-sdk' },
  // { name: 'Claude Agent SDK & SRE Tool MCP', model: 'Claude 4.5 Opus', org: 'Anthropic', correct: '86.57%', date: '2026/1/17', frameworkOpen: false, modelOpen: false, trajUrl: 'https://example.com/traj/claude-agent-sdk' },
  
  // New baselines - RCA-Agent
  { name: 'RCA-Agent', model: 'Claude 4.6 Opus', org: 'OpenRCA', correct: '36.42%', date: '2026/2/10', frameworkOpen: true, modelOpen: false, trajUrl: 'https://example.com/traj/rca-agent-claude' },
  { name: 'RCA-Agent', model: 'Claude 4.5 Opus', org: 'OpenRCA', correct: '28.36%', date: '2026/2/10', frameworkOpen: true, modelOpen: false, trajUrl: 'https://example.com/traj/rca-agent-claude' },
  { name: 'RCA-Agent', model: 'GPT-5.2', org: 'OpenRCA', correct: '19.40%', date: '2026/2/10', frameworkOpen: true, modelOpen: false, trajUrl: 'https://example.com/traj/rca-agent-gpt4o' },
  { name: 'RCA-Agent', model: 'Gemini 3 Pro', org: 'OpenRCA', correct: '12.54%', date: '2026/2/10', frameworkOpen: true, modelOpen: false, trajUrl: 'https://example.com/traj/rca-agent-gemini' },
  
  // Closed Models - RCA-Agent
  { name: 'RCA-Agent', model: 'Claude 3.5 Sonnet', org: 'OpenRCA', correct: '11.34%', date: '2025/1/23', frameworkOpen: true, modelOpen: false, trajUrl: 'https://example.com/traj/rca-agent-claude' },
  { name: 'RCA-Agent', model: 'GPT-4o', org: 'OpenRCA', correct: '8.96%', date: '2025/1/23', frameworkOpen: true, modelOpen: false, trajUrl: 'https://example.com/traj/rca-agent-gpt4o' },
  { name: 'RCA-Agent', model: 'Gemini 1.5 Pro', org: 'OpenRCA', correct: '2.69%', date: '2025/1/23', frameworkOpen: true, modelOpen: false, trajUrl: 'https://example.com/traj/rca-agent-gemini' },
  
  // Closed Models - Balanced
  { name: 'Prompting (Balanced)', model: 'Claude 3.5 Sonnet', org: 'None', correct: '3.88%', date: '2025/1/23', frameworkOpen: true, modelOpen: false },
  { name: 'Prompting (Balanced)', model: 'GPT-4o', org: 'None', correct: '3.28%', date: '2025/1/23', frameworkOpen: true, modelOpen: false },
  { name: 'Prompting (Balanced)', model: 'Gemini 1.5 Pro', org: 'None', correct: '6.27%', date: '2025/1/23', frameworkOpen: true, modelOpen: false },
  
  // Closed Models - Oracle
  { name: 'Prompting (Oracle)', model: 'Claude 3.5 Sonnet', org: 'None', correct: '5.37%', date: '2025/1/23', frameworkOpen: true, modelOpen: false },
  { name: 'Prompting (Oracle)', model: 'GPT-4o', org: 'None', correct: '6.27%', date: '2025/1/23', frameworkOpen: true, modelOpen: false },
  { name: 'Prompting (Oracle)', model: 'Gemini 1.5 Pro', org: 'None', correct: '7.16%', date: '2025/1/23', frameworkOpen: true, modelOpen: false },
  
  // Open Source Models - Balanced
  { name: 'Prompting (Balanced)', model: 'Mistral Large 2', org: 'None', correct: '3.58%', date: '2025/1/23', frameworkOpen: true, modelOpen: true, trajUrl: '' },
  { name: 'Prompting (Balanced)', model: 'Command R+', org: 'None', correct: '4.18%', date: '2025/1/23', frameworkOpen: true, modelOpen: true },
  { name: 'Prompting (Balanced)', model: 'Llama 3.1 Instruct', org: 'None', correct: '2.99%', date: '2025/1/23', frameworkOpen: true, modelOpen: true },
  
  // Open Source Models - Oracle
  { name: 'Prompting (Oracle)', model: 'Mistral Large 2', org: 'None', correct: '4.48%', date: '2025/1/23', frameworkOpen: true, modelOpen: true },
  { name: 'Prompting (Oracle)', model: 'Command R+', org: 'None', correct: '4.78%', date: '2025/1/23', frameworkOpen: true, modelOpen: true },
  { name: 'Prompting (Oracle)', model: 'Llama 3.1 Instruct', org: 'None', correct: '3.88%', date: '2025/1/23', frameworkOpen: true, modelOpen: true },
  
  // Open Source Models - RCA-Agent
  { name: 'RCA-Agent', model: 'Llama 3.1 Instruct', org: 'None', correct: '3.28%', date: '2025/1/23', frameworkOpen: true, modelOpen: true }
];

export const modelDataOpenRCA2: DataOpenRCA2[] = [
  { name: 'DeepResearch', model: 'GPT-5.6 Sol', modelId: 'gpt-5.6-sol-passthrough', frameworkOpen: false, modelOpen: false, f1: '54.43%', acc: '38.00%', nodeF1: '76.05%', edgeF1: '61.29%', anyHit: '84.20%', allHit: '54.00%', pathAcc: '59.60%', typeAcc: '74.47%' },
  { name: 'DeepResearch', model: 'Claude Fable 5', modelId: 'claude-fable-5-passthrough', frameworkOpen: false, modelOpen: false, f1: '53.36%', acc: '35.20%', nodeF1: '78.80%', edgeF1: '66.07%', anyHit: '85.20%', allHit: '51.20%', pathAcc: '62.00%', typeAcc: '73.59%' },
  { name: 'DeepResearch', model: 'Grok 4.5', modelId: 'grok-4.5-passthrough', frameworkOpen: false, modelOpen: false, f1: '45.90%', acc: '33.60%', nodeF1: '78.68%', edgeF1: '65.42%', anyHit: '87.40%', allHit: '61.20%', pathAcc: '50.00%', typeAcc: '59.15%' },
  { name: 'DeepResearch', model: 'Claude Sonnet 5', modelId: 'claude-sonnet-5-passthrough', frameworkOpen: false, modelOpen: false, f1: '43.20%', acc: '27.20%', nodeF1: '78.79%', edgeF1: '64.10%', anyHit: '85.20%', allHit: '51.40%', pathAcc: '50.00%', typeAcc: '60.09%' },
  { name: 'DeepResearch', model: 'GPT-5.5', modelId: 'gpt-5.5-passthrough', frameworkOpen: false, modelOpen: false, f1: '41.57%', acc: '26.80%', nodeF1: '77.26%', edgeF1: '62.77%', anyHit: '84.80%', allHit: '51.40%', pathAcc: '47.80%', typeAcc: '57.55%' },
  { name: 'DeepResearch', model: 'GPT-5.4', modelId: 'gpt-5.4-2026-03-05-passthrough', frameworkOpen: false, modelOpen: false, f1: '40.83%', acc: '25.80%', nodeF1: '74.48%', edgeF1: '59.42%', anyHit: '84.20%', allHit: '50.40%', pathAcc: '46.60%', typeAcc: '57.48%' },
  { name: 'DeepResearch', model: 'Claude Opus 4.6', modelId: 'claude-opus-4-6-passthrough', frameworkOpen: false, modelOpen: false, f1: '40.40%', acc: '25.20%', nodeF1: '77.34%', edgeF1: '62.29%', anyHit: '82.00%', allHit: '48.80%', pathAcc: '47.40%', typeAcc: '58.41%' },
  { name: 'DeepResearch', model: 'Kimi K2.6', modelId: 'moonshot_kimi-k2.6-passthrough', frameworkOpen: false, modelOpen: false, f1: '39.60%', acc: '24.80%', nodeF1: '74.11%', edgeF1: '58.18%', anyHit: '80.40%', allHit: '48.00%', pathAcc: '45.89%', typeAcc: '58.46%' },
  { name: 'DeepResearch', model: 'Claude Opus 4.8', modelId: 'claude-opus-4-8-passthrough', frameworkOpen: false, modelOpen: false, f1: '39.23%', acc: '24.00%', nodeF1: '74.55%', edgeF1: '56.44%', anyHit: '80.60%', allHit: '46.40%', pathAcc: '46.40%', typeAcc: '58.19%' },
  { name: 'DeepResearch', model: 'Gemini 3.5 Flash', modelId: 'gemini-3.5-flash-passthrough', frameworkOpen: false, modelOpen: false, f1: '38.63%', acc: '23.60%', nodeF1: '70.05%', edgeF1: '54.29%', anyHit: '77.60%', allHit: '45.20%', pathAcc: '42.80%', typeAcc: '59.41%' },
  { name: 'DeepResearch', model: 'HY 3.0', modelId: 'hunyuan-3.0-dev-0703-major', frameworkOpen: false, modelOpen: false, f1: '37.50%', acc: '22.60%', nodeF1: '70.42%', edgeF1: '52.88%', anyHit: '81.60%', allHit: '48.80%', pathAcc: '42.40%', typeAcc: '55.51%' },
  { name: 'DeepResearch', model: 'Gemini 3.1 Pro', modelId: 'gemini-3.1-pro-preview', frameworkOpen: false, modelOpen: false, f1: '37.47%', acc: '23.40%', nodeF1: '73.55%', edgeF1: '57.43%', anyHit: '80.40%', allHit: '47.60%', pathAcc: '43.00%', typeAcc: '55.22%' },
  { name: 'DeepResearch', model: 'GLM-5.2', modelId: 'glm-5.2-passthrough', frameworkOpen: false, modelOpen: false, f1: '37.23%', acc: '21.40%', nodeF1: '73.91%', edgeF1: '58.03%', anyHit: '82.20%', allHit: '50.00%', pathAcc: '44.40%', typeAcc: '54.99%' },
  { name: 'DeepResearch', model: 'DeepSeek V4 Pro', modelId: 'deepseek-v4-pro-passthrough', frameworkOpen: false, modelOpen: false, f1: '36.83%', acc: '23.60%', nodeF1: '71.37%', edgeF1: '54.90%', anyHit: '78.60%', allHit: '47.60%', pathAcc: '42.00%', typeAcc: '55.47%' },
  { name: 'DeepResearch', model: 'Qwen 3.7 Max', modelId: 'qwen3.7-max-passthrough', frameworkOpen: false, modelOpen: false, f1: '36.83%', acc: '21.00%', nodeF1: '74.65%', edgeF1: '62.00%', anyHit: '84.40%', allHit: '52.20%', pathAcc: '45.40%', typeAcc: '53.91%' },
  { name: 'DeepResearch', model: 'DeepSeek V4 Flash', modelId: 'deepseek-v4-flash-passthrough', frameworkOpen: false, modelOpen: false, f1: '35.10%', acc: '20.64%', nodeF1: '74.60%', edgeF1: '57.99%', anyHit: '82.57%', allHit: '51.30%', pathAcc: '42.89%', typeAcc: '52.06%' },
  { name: 'DeepResearch', model: 'MiMo V2.5 Pro', modelId: 'xiaomi_mimo-v2.5-pro-passthrough', frameworkOpen: false, modelOpen: false, f1: '34.77%', acc: '20.40%', nodeF1: '70.58%', edgeF1: '54.13%', anyHit: '78.40%', allHit: '47.80%', pathAcc: '40.68%', typeAcc: '53.95%' },
  { name: 'DeepResearch', model: 'Kimi K2.7 Code', modelId: 'moonshot_kimi-k2.7-code-passthrough', frameworkOpen: false, modelOpen: false, f1: '34.60%', acc: '21.40%', nodeF1: '70.91%', edgeF1: '55.31%', anyHit: '76.40%', allHit: '46.80%', pathAcc: '40.48%', typeAcc: '54.06%' },
  { name: 'DeepResearch', model: 'Seed 2.1 Pro', modelId: 'doubao-seed-2-1-pro-passthrough', frameworkOpen: false, modelOpen: false, f1: '33.67%', acc: '19.80%', nodeF1: '72.96%', edgeF1: '56.46%', anyHit: '77.20%', allHit: '45.40%', pathAcc: '40.40%', typeAcc: '52.72%' },
  { name: 'DeepResearch', model: 'MiniMax M3', modelId: 'minimax_m3-passthrough', frameworkOpen: false, modelOpen: false, f1: '33.32%', acc: '18.60%', nodeF1: '70.05%', edgeF1: '51.51%', anyHit: '75.20%', allHit: '42.40%', pathAcc: '40.08%', typeAcc: '54.52%' },
  { name: 'DeepResearch', model: 'Qwen 3.7 Plus', modelId: 'qwen3.7-plus-passthrough', frameworkOpen: false, modelOpen: false, f1: '32.77%', acc: '16.60%', nodeF1: '70.52%', edgeF1: '55.55%', anyHit: '76.60%', allHit: '45.00%', pathAcc: '41.48%', typeAcc: '54.44%' },
  { name: 'DeepResearch', model: 'LongCat 2.0', modelId: 'longcat-2.0-passthrough', frameworkOpen: false, modelOpen: false, f1: '32.28%', acc: '18.00%', nodeF1: '65.46%', edgeF1: '47.89%', anyHit: '72.80%', allHit: '43.80%', pathAcc: '37.88%', typeAcc: '54.53%' },
  { name: 'DeepResearch', model: 'StepFun 3.7 Flash', modelId: 'step-3.7-flash-passthrough', frameworkOpen: false, modelOpen: false, f1: '24.84%', acc: '14.23%', nodeF1: '66.00%', edgeF1: '47.75%', anyHit: '72.14%', allHit: '43.89%', pathAcc: '30.26%', typeAcc: '42.08%' },
  { name: 'DeepResearch', model: 'Seed 2.0 Lite', modelId: 'doubao-seed-2-0-lite-passthrough', frameworkOpen: false, modelOpen: false, f1: '24.83%', acc: '14.20%', nodeF1: '66.75%', edgeF1: '48.66%', anyHit: '66.80%', allHit: '39.80%', pathAcc: '30.20%', typeAcc: '45.36%' },
];
