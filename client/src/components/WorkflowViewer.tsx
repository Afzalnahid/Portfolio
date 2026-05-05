import { ReactNode, useCallback, useState, useEffect, memo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  NodeProps,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  X, Maximize2, Minimize2, 
  Globe, Mail, Database, Bot, 
  Cpu, Code, Share2, Workflow, 
  Settings, MessageSquare, Play, 
  Zap, Clock, FileJson, Video, List,
  Search, CheckCircle2, MoreHorizontal,
  Home, Plus, Layers, Info, History,
  ChevronDown, Search as SearchIcon,
  MousePointer2, ZoomIn, ZoomOut, RotateCcw,
  Eraser, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- n8n "Modern Dark" Node Component ---
const N8nNode = memo(({ data }: NodeProps) => {
  const isTrigger = (data.type as string).toLowerCase().includes('trigger') || (data.type as string).toLowerCase().includes('webhook');

  const getIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('webhook')) return <Globe size={18} />;
    if (t.includes('httprequest')) return <Zap size={18} />;
    if (t.includes('googlesheets')) return <List size={18} />;
    if (t.includes('langchain')) return <Bot size={18} />;
    if (t.includes('postgres') || t.includes('supabase')) return <Database size={18} />;
    if (t.includes('code')) return <Code size={18} />;
    if (t.includes('schedule')) return <Clock size={18} />;
    if (t.includes('set')) return <Settings size={18} />;
    if (t.includes('switch') || t.includes('if')) return <Workflow size={18} />;
    if (t.includes('telegram') || t.includes('facebook')) return <MessageSquare size={18} />;
    return <Cpu size={18} />;
  };

  const getColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('trigger') || t.includes('webhook') || t.includes('schedule')) return '#ff6d5a'; 
    if (t.includes('langchain') || t.includes('ai')) return '#ff9900'; 
    if (t.includes('googlesheets')) return '#1d8d53'; 
    if (t.includes('postgres') || t.includes('supabase')) return '#0052cc'; 
    if (t.includes('code')) return '#fcc419'; 
    if (t.includes('switch') || t.includes('if')) return '#6b7280'; 
    return '#4e54c8'; 
  };

  return (
    <div className="flex items-center bg-[#1a1a1a] rounded-[3px] border border-[#333] min-w-[160px] h-[40px] relative shadow-lg group">
      {!isTrigger && (
        <Handle 
          type="target" 
          position={Position.Left} 
          className="!w-[6px] !h-[6px] !bg-[#444] !border-none !-left-[3px]" 
        />
      )}
      
      <div 
        className="w-[40px] h-[38px] flex items-center justify-center text-white rounded-l-[2px]"
        style={{ backgroundColor: getColor(data.type as string) }}
      >
        {getIcon(data.type as string)}
      </div>
      
      <div className="px-3 flex flex-col justify-center flex-grow overflow-hidden">
        <span className="text-[11px] font-medium text-white truncate leading-tight">
          {data.label as string}
        </span>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="!w-[6px] !h-[6px] !bg-[#444] !border-none !-right-[3px]" 
      />
    </div>
  );
});

N8nNode.displayName = 'N8nNode';

const nodeTypes = {
  n8n: N8nNode,
};

// --- Main Viewer Component ---
interface WorkflowViewerProps {
  workflowJson: any;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const parseN8nToReactFlow = (json: any) => {
  if (!json || !json.nodes) return { nodes: [], edges: [] };

  const nodes: Node[] = json.nodes.map((node: any) => ({
    id: node.name,
    type: 'n8n',
    data: { label: node.name, type: node.type },
    position: { x: node.position[0], y: node.position[1] },
  }));

  const edges: Edge[] = [];
  const connections = json.connections || {};

  Object.keys(connections).forEach((sourceName) => {
    const outputs = connections[sourceName];
    Object.keys(outputs).forEach((outputType) => {
      outputs[outputType].forEach((connectionGroup: any[]) => {
        connectionGroup.forEach((target: any) => {
          edges.push({
            id: `e-${sourceName}-${target.node}-${Math.random()}`,
            source: sourceName,
            target: target.node,
            type: 'smoothstep',
            animated: false,
            style: { stroke: '#444', strokeWidth: 1.5 },
          });
        });
      });
    });
  });

  return { nodes, edges };
};

export default function WorkflowViewer({ workflowJson, isOpen, onClose, title }: WorkflowViewerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen && workflowJson) {
      const { nodes: parsedNodes, edges: parsedEdges } = parseN8nToReactFlow(workflowJson);
      setNodes(parsedNodes);
      setEdges(parsedEdges);
    }
  }, [isOpen, workflowJson, setNodes, setEdges]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d]"
      >
        <div className="absolute inset-0" />
        
        <div className="w-full h-full flex flex-col relative">
          
          {/* Top Bar - breadcrumbs, tabs, publish toggle */}
          <div className="h-14 bg-[#111] border-b border-[#222] flex items-center justify-between px-4 z-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[13px]">
                <Bot size={16} className="text-slate-400" />
                <span className="text-slate-400">Personal</span>
                <span className="text-slate-600">/</span>
                <span className="text-white font-medium">{title}</span>
                <span className="text-slate-500 ml-2">+ Add tag</span>
              </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-[#1a1a1a] rounded-md p-1 border border-[#222]">
              <button className="px-4 py-1.5 text-[12px] font-medium text-white bg-[#222] rounded-[4px]">Editor</button>
              <button className="px-4 py-1.5 text-[12px] font-medium text-slate-400 hover:text-white transition-colors">Executions</button>
              <button className="px-4 py-1.5 text-[12px] font-medium text-slate-400 hover:text-white transition-colors">Evaluations</button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-slate-500 font-bold">0 / 4</span>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#222] rounded-md">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                   <span className="text-[12px] font-bold text-emerald-500">Published</span>
                   <ChevronDown size={14} className="text-slate-500" />
                </div>
                <History size={18} className="text-slate-400 cursor-pointer hover:text-white transition-colors" />
                <MoreHorizontal size={18} className="text-slate-400 cursor-pointer hover:text-white transition-colors" />
                <X 
                  size={20} 
                  className="text-slate-400 cursor-pointer hover:text-white transition-colors ml-4" 
                  onClick={onClose}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-grow">
            {/* Left Sidebar */}
            <div className="w-14 bg-[#111] border-r border-[#222] flex flex-col items-center py-4 gap-6 z-50">
              <Home size={20} className="text-slate-500 cursor-pointer hover:text-white" />
              <Layers size={20} className="text-slate-500 cursor-pointer hover:text-white" />
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 border border-white/5">
                <Plus size={18} />
              </div>
              <SearchIcon size={20} className="text-slate-500 cursor-pointer hover:text-white" />
              <Info size={20} className="text-slate-500 cursor-pointer hover:text-white" />
            </div>

            {/* Canvas Area */}
            <div className="flex-grow relative bg-[#121212] overflow-hidden">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                colorMode="dark"
                minZoom={0.05}
                maxZoom={2}
              >
                <Background 
                  variant={'dots' as any} 
                  gap={24} 
                  size={1} 
                  color="#222" 
                />
                
                {/* Right Floating Bar */}
                <Panel position="top-right" className="flex flex-col gap-2 mt-4 mr-4">
                  {[Plus, SearchIcon, Layers, Info, History].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-[#1a1a1a] border border-[#222] rounded-lg flex items-center justify-center text-slate-400 cursor-pointer hover:bg-[#222] hover:text-white transition-all shadow-xl">
                      <Icon size={18} />
                    </div>
                  ))}
                </Panel>

                {/* Bottom Left Toolbar */}
                <Panel position="bottom-left" className="m-4 flex items-center gap-1 bg-[#1a1a1a] border border-[#222] p-1 rounded-lg shadow-2xl">
                  <div className="p-2 text-slate-400 hover:text-white cursor-pointer"><Maximize2 size={16} /></div>
                  <div className="p-2 text-slate-400 hover:text-white cursor-pointer"><ZoomIn size={16} /></div>
                  <div className="p-2 text-slate-400 hover:text-white cursor-pointer"><ZoomOut size={16} /></div>
                  <div className="p-2 text-slate-400 hover:text-white cursor-pointer"><RotateCcw size={16} /></div>
                  <div className="w-[1px] h-4 bg-[#222] mx-1" />
                  <div className="p-2 text-slate-400 hover:text-white cursor-pointer"><Eraser size={16} /></div>
                </Panel>

                {/* Center Bottom Execute Button */}
                <Panel position="bottom-center" className="mb-8">
                  <div className="flex items-center bg-[#ff6d5a] rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(255,109,90,0.3)] group cursor-pointer active:scale-95 transition-all">
                    <div className="px-3 py-4 flex items-center justify-center border-r border-white/10 group-hover:bg-white/10">
                       <Zap size={20} className="text-white fill-white" />
                    </div>
                    <div className="px-6 py-4 flex flex-col items-start bg-[#ff6d5a] group-hover:bg-[#ff7e6d] transition-colors">
                      <span className="text-[14px] font-bold text-white leading-none">Execute workflow</span>
                      <span className="text-[10px] text-white/70 font-bold mt-1 uppercase tracking-tight">from Webhook</span>
                    </div>
                    <div className="px-3 py-4 flex items-center justify-center border-l border-white/10 group-hover:bg-white/10">
                       <ChevronDown size={16} className="text-white" />
                    </div>
                  </div>
                </Panel>

                <Panel position="bottom-left" className="!m-0 !left-0 !bottom-0">
                   <div className="h-8 bg-[#111] border-t border-[#222] w-screen flex items-center px-4 gap-4">
                      <Terminal size={12} className="text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logs</span>
                   </div>
                </Panel>
              </ReactFlow>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
