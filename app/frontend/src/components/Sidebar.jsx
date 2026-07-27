import React, { memo } from "react";
import { Image, FolderDown, MessageSquare, Mic, Settings, Shield, Terminal, ChevronDown, ChevronUp, Trash2, Volume2 } from "lucide-react";

function formatSidebarDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${dateStr} ${timeStr}`;
}

function Sidebar({ 
  collapsed = false,
  activeTab, 
  setActiveTab, 
  specs,
  conversations = [],
  activeConversationId,
  setActiveConversationId,
  showHistory,
  setShowHistory,
  onDeleteConversation,
  speechTranscriptions = [],
  selectedSpeechTranscript,
  setSelectedSpeechTranscript,
  showSpeechHistory,
  setShowSpeechHistory,
  onDeleteSpeechTranscription,
  ttsOutputs = [],
  selectedTtsOutput,
  setSelectedTtsOutput,
  showTtsHistory,
  setShowTtsHistory,
  onDeleteTtsOutput
}) {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div>
        {/* Sidebar Header */}
        <div className="sidebar-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#ff0000", flexShrink: 0 }}>
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          <span className="sidebar-logo-text">TechTonic AI Studio</span>
        </div>

        {/* Sidebar Navigation Links (Material 3 style) */}
        <div className="nav-list">
          <div
            className={`nav-item ${activeTab === "generator" ? "active" : ""}`}
            onClick={() => setActiveTab("generator")}
          >
            <Image size={20} />
            <span>Image Generator</span>
          </div>

          <div className="nav-item-wrapper" style={{ display: "flex", flexDirection: "column" }}>
            <div
              className={`nav-item ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", boxSizing: "border-box" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <MessageSquare size={20} />
                <span>Text Chat</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHistory(!showHistory);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "background-color 0.2s"
                }}
                className="history-toggle-arrow"
                title={showHistory ? "Hide Chat History" : "Show Chat History"}
              >
                {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* Sidebar Chat History List */}
            {showHistory && (
              <div 
                className="sidebar-history-list" 
                style={{ 
                  paddingLeft: "14px", 
                  marginTop: "6px", 
                  marginBottom: "6px",
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "4px", 
                  maxHeight: "220px", 
                  overflowY: "auto",
                  borderLeft: "2px solid var(--border-color)"
                }}
              >
                {conversations.length === 0 ? (
                  <div style={{ padding: "8px 12px", fontSize: "0.78rem", color: "var(--md-sys-color-outline)", opacity: 0.8 }}>
                    No saved chats
                  </div>
                ) : (
                  conversations.map((conv) => {
                    const isActive = activeConversationId === conv.id;
                    return (
                      <div
                        key={conv.id}
                        onClick={() => {
                          setActiveConversationId(conv.id);
                          setActiveTab("chat");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "6px 8px 6px 10px",
                          borderRadius: "var(--md-shape-corner-small)",
                          fontSize: "0.78rem",
                          cursor: "pointer",
                          background: isActive ? "var(--md-sys-color-secondary-container)" : "transparent",
                          color: isActive ? "var(--md-sys-color-on-secondary-container)" : "var(--md-sys-color-on-surface-variant)",
                          border: isActive ? "1px solid var(--md-sys-color-outline-variant)" : "1px solid transparent",
                          transition: "background 0.2s"
                        }}
                        className="sidebar-history-item"
                        title={conv.title}
                      >
                        <span style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                          fontWeight: isActive ? 600 : 400
                        }}>
                          {conv.title}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteConversation(conv.id, e);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--md-sys-color-outline)",
                            cursor: "pointer",
                            padding: "2px",
                            marginLeft: "6px",
                            display: "flex",
                            alignItems: "center"
                          }}
                          className="sidebar-history-delete"
                          title="Delete Conversation"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div className="nav-item-wrapper" style={{ display: "flex", flexDirection: "column" }}>
            <div
              className={`nav-item ${activeTab === "speech" ? "active" : ""}`}
              onClick={() => setActiveTab("speech")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", boxSizing: "border-box" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Mic size={20} />
                <span>Speech Transcriber</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSpeechHistory(!showSpeechHistory);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "background-color 0.2s"
                }}
                className="history-toggle-arrow"
                title={showSpeechHistory ? "Hide Transcriptions" : "Show Transcriptions"}
              >
                {showSpeechHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {showSpeechHistory && (
              <div
                className="sidebar-history-list"
                style={{
                  paddingLeft: "14px",
                  marginTop: "6px",
                  marginBottom: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  maxHeight: "220px",
                  overflowY: "auto",
                  borderLeft: "2px solid var(--border-color)"
                }}
              >
                {speechTranscriptions.length === 0 ? (
                  <div style={{ padding: "8px 12px", fontSize: "0.78rem", color: "var(--md-sys-color-outline)", opacity: 0.8 }}>
                    No saved transcriptions
                  </div>
                ) : (
                  speechTranscriptions.map((item) => {
                    const itemId = item.filename || item.metadata || item.textFile;
                    const isActive = selectedSpeechTranscript && (selectedSpeechTranscript.filename || selectedSpeechTranscript.metadata || selectedSpeechTranscript.textFile) === itemId;
                    const title = item.displayName || item.sourceFilename || item.textFile || item.filename || "Transcript";
                    const date = formatSidebarDate(item.modifiedAt || item.createdAt);
                    return (
                      <div
                        key={itemId}
                        onClick={() => {
                          setSelectedSpeechTranscript(item);
                          setActiveTab("speech");
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "7px 8px 7px 10px",
                          borderRadius: "var(--md-shape-corner-small)",
                          fontSize: "0.78rem",
                          cursor: "pointer",
                          background: isActive ? "var(--md-sys-color-secondary-container)" : "transparent",
                          color: isActive ? "var(--md-sys-color-on-secondary-container)" : "var(--md-sys-color-on-surface-variant)",
                          border: isActive ? "1px solid var(--md-sys-color-outline-variant)" : "1px solid transparent",
                          transition: "background 0.2s"
                        }}
                        className="sidebar-history-item"
                        title={title}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, minWidth: 0 }}>
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: isActive ? 600 : 400 }}>
                            {title}
                          </span>
                          {date && (
                            <span style={{ fontSize: "0.68rem", opacity: 0.72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {date}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSpeechTranscription?.(item, e);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--md-sys-color-outline)",
                            cursor: "pointer",
                            padding: "2px",
                            marginLeft: "6px",
                            display: "flex",
                            alignItems: "center"
                          }}
                          className="sidebar-history-delete"
                          title="Delete Transcription"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div className="nav-item-wrapper" style={{ display: "flex", flexDirection: "column" }}>
            <div
              className={`nav-item ${activeTab === "tts" ? "active" : ""}`}
              onClick={() => setActiveTab("tts")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", boxSizing: "border-box" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Volume2 size={20} />
                <span>Text to Speech</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTtsHistory(!showTtsHistory);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "background-color 0.2s"
                }}
                className="history-toggle-arrow"
                title={showTtsHistory ? "Hide TTS Outputs" : "Show TTS Outputs"}
              >
                {showTtsHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {showTtsHistory && (
              <div
                className="sidebar-history-list"
                style={{
                  paddingLeft: "14px",
                  marginTop: "6px",
                  marginBottom: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  maxHeight: "220px",
                  overflowY: "auto",
                  borderLeft: "2px solid var(--border-color)"
                }}
              >
                {ttsOutputs.length === 0 ? (
                  <div style={{ padding: "8px 12px", fontSize: "0.78rem", color: "var(--md-sys-color-outline)", opacity: 0.8 }}>
                    No saved audio
                  </div>
                ) : (
                  ttsOutputs.map((item) => {
                    const itemId = item.filename || item.metadata || item.audioFile;
                    const isActive = selectedTtsOutput && (selectedTtsOutput.filename || selectedTtsOutput.metadata || selectedTtsOutput.audioFile) === itemId;
                    const title = item.displayName || item.text || item.audioFile || item.filename || "TTS Output";
                    const date = formatSidebarDate(item.modifiedAt || item.createdAt);
                    return (
                      <div
                        key={itemId}
                        onClick={() => {
                          setSelectedTtsOutput(item);
                          setActiveTab("tts");
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "7px 8px 7px 10px",
                          borderRadius: "var(--md-shape-corner-small)",
                          fontSize: "0.78rem",
                          cursor: "pointer",
                          background: isActive ? "var(--md-sys-color-secondary-container)" : "transparent",
                          color: isActive ? "var(--md-sys-color-on-secondary-container)" : "var(--md-sys-color-on-surface-variant)",
                          border: isActive ? "1px solid var(--md-sys-color-outline-variant)" : "1px solid transparent",
                          transition: "background 0.2s"
                        }}
                        className="sidebar-history-item"
                        title={title}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, minWidth: 0 }}>
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: isActive ? 600 : 400 }}>
                            {title}
                          </span>
                          {date && (
                            <span style={{ fontSize: "0.68rem", opacity: 0.72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {date}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTtsOutput?.(item, e);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--md-sys-color-outline)",
                            cursor: "pointer",
                            padding: "2px",
                            marginLeft: "6px",
                            display: "flex",
                            alignItems: "center"
                          }}
                          className="sidebar-history-delete"
                          title="Delete TTS Output"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div
            className={`nav-item ${activeTab === "models" ? "active" : ""}`}
            onClick={() => setActiveTab("models")}
          >
            <FolderDown size={20} />
            <span>Model Manager</span>
          </div>

          <div
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* ─── YouTube Channel Promo ─── */}
      <div style={{
        margin: "12px 8px",
        padding: "12px",
        borderRadius: "var(--md-shape-corner-medium)",
        background: "color-mix(in srgb, #ff0000 8%, var(--md-sys-color-surface-variant) 92%)",
        border: "1px solid color-mix(in srgb, #ff0000 20%, var(--border-color) 80%)",
        textAlign: "center"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          marginBottom: "6px"
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0000">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          <span style={{ fontWeight: 700, fontSize: "0.8rem", color: "#ff0000" }}>TechTonic</span>
        </div>
        <p style={{
          fontSize: "0.72rem",
          color: "var(--md-sys-color-on-surface-variant)",
          margin: "0 0 8px 0",
          lineHeight: "1.4"
        }}>
          AI tutorials, tips & tools to improve your life.<br />
          New videos every week — subscribe!
        </p>
        <a
          href="https://www.youtube.com/@TechTonic-t9b"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 16px",
            borderRadius: "var(--md-shape-corner-full)",
            background: "#ff0000",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.78rem",
            textDecoration: "none",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 8px rgba(255,0,0,0.3)"
          }}
          onMouseEnter={(e) => { e.target.style.background = "#cc0000"; e.target.style.transform = "scale(1.03)"; }}
          onMouseLeave={(e) => { e.target.style.background = "#ff0000"; e.target.style.transform = "scale(1)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          Visit My Channel
        </a>
      </div>

      {/* Sidebar Footer with Host Telemetry System Specs */}
      <div className="sidebar-footer">
        <div className="sidebar-specs-header">
          <Terminal size={12} />
          <span>Host Specifications</span>
        </div>
        <div className="sidebar-specs-item" title={specs.cpu_name}>
          CPU: {specs.cpu_name}
        </div>
        <div className="sidebar-specs-item" title={specs.gpu_name}>
          GPU: {specs.gpu_name}
        </div>
        <div className="sidebar-specs-item">
          Memory: {specs.ram_total_gb.toFixed(0)} GB RAM ({specs.cpu_cores_physical} Cores)
        </div>
        <div className="sidebar-specs-os">
          OS: {specs.os_name}
        </div>
        <div style={{
          marginTop: "8px",
          paddingTop: "8px",
          borderTop: "1px solid var(--border-color)",
          fontSize: "0.68rem",
          color: "var(--md-sys-color-outline)",
          textAlign: "center"
        }}>
          Made with ❤️ by <a
            href="https://www.youtube.com/@TechTonic-t9b"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ff0000", fontWeight: 600, textDecoration: "none" }}
          >TechTonic</a>
        </div>
      </div>
    </div>
  );
}

export default memo(Sidebar);
