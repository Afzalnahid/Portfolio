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
  Eraser, Terminal, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- n8n "Modern Dark" Node Component ---
const N8nNode = memo(({ data }: NodeProps) => {
  const isTrigger = (data.type as string).toLowerCase().includes('trigger') || (data.type as string).toLowerCase().includes('webhook');

  const getIcon = (type: string) => {
    // Real, official n8n logo SVG
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path fill="#ffffff" d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632"/>
      </svg>
    );
  };

  const getColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('trigger') || t.includes('webhook') || t.includes('schedule')) return '#EA4B71'; 
    if (t.includes('langchain') || t.includes('ai')) return '#ff9900'; 
    if (t.includes('googlesheets')) return '#1d8d53'; 
    if (t.includes('postgres') || t.includes('supabase')) return '#0052cc'; 
    if (t.includes('code')) return '#fcc419'; 
    if (t.includes('switch') || t.includes('if')) return '#6b7280'; 
    return '#EA4B71'; 
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
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {getIcon(data.type as string)}
        </motion.div>
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

  const nodes: Node[] = json.nodes
    .filter((node: any) => node.type !== 'n8n-nodes-base.stickyNote')
    .map((node: any) => ({
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
            animated: true,
            style: { stroke: '#ff6d5a', strokeWidth: 2 },
          });
        });
      });
    });
  });

  return { nodes, edges };
};

export default function WorkflowViewer({ workflowJson, isOpen, onClose, title }: WorkflowViewerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

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
          
          {/* Top Bar */}
          <div className="h-14 bg-[#111] border-b border-[#222] flex items-center justify-between px-4 z-50">
            <div className="flex items-center gap-4">
              <button 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md cursor-pointer transition-colors shadow-lg active:scale-95 border border-blue-500/50"
                onClick={onClose}
              >
                <ArrowLeft size={16} />
                <span className="text-[13px] font-bold tracking-wide uppercase">Back to Projects</span>
              </button>
              <div className="hidden sm:flex items-center gap-2 text-[13px] ml-4 border-l border-[#222] pl-4">
                <Bot size={16} className="text-slate-400" />
                <span className="text-slate-400">Personal</span>
                <span className="text-slate-600">/</span>
                <span className="text-white font-medium">{title}</span>
                <span className="text-slate-500 ml-2">+ Add tag</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-slate-500 font-bold">0 / 4</span>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#222] rounded-md">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                   <span className="text-[12px] font-bold text-emerald-500">Active</span>
                </div>
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
                  {[SearchIcon, Layers, Info].map((Icon, idx) => (
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
                </Panel>

                <Panel position="bottom-left" className="!m-0 !left-0 !bottom-0">
                   <div className="h-8 bg-[#111] border-t border-[#222] w-screen flex items-center px-4 gap-4">
                      <Terminal size={12} className="text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Execution Log</span>
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
