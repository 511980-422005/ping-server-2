const express = require("express");
const router = express.Router();
const cors = require("cors");

// Enhanced CORS configuration
router.use(cors({
  origin: "*", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// In-memory storage with enhanced metadata
const BASE_URLS = {};
const TOKEN = "Fks7d29Ds91Aqp3RzXvBcnU83vHslTyq";

// Enhanced authentication middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required",
      timestamp: new Date().toISOString()
    });
  }
  
  if (token !== TOKEN) {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization token",
      timestamp: new Date().toISOString()
    });
  }
  
  next();
};

// Utility functions
const getTimestamp = () => {
  const now = new Date();
  return {
    iso: now.toISOString(),
    unix: now.getTime(),
    readable: now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
  };
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const formatTimeAgo = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  return 'Just now';
};

const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Save base URL(s) with proper validation and metadata
router.post("/saveBaseUrl", auth, (req, res) => {
  try {
    const body = req.body;
    
    // Enhanced validation
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a valid object",
        timestamp: new Date().toISOString()
      });
    }

    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body cannot be empty",
        timestamp: new Date().toISOString()
      });
    }

    const timestamp = getTimestamp();
    const savedKeys = [];
    const updatedKeys = [];
    const errors = [];

    // Process each key-value pair with enhanced validation
    Object.entries(body).forEach(([key, value]) => {
      // Validate key
      if (!key || typeof key !== "string" || key.trim() === "") {
        errors.push(`Invalid key: '${key}' - must be a non-empty string`);
        return;
      }

      const trimmedKey = key.trim();
      
      // Validate value (URL)
      if (!value || typeof value !== "string") {
        errors.push(`Invalid URL for key '${trimmedKey}' - must be a non-empty string`);
        return;
      }

      const trimmedValue = value.trim();
      
      if (!isValidUrl(trimmedValue)) {
        errors.push(`Invalid URL format for key '${trimmedKey}': ${trimmedValue}`);
        return;
      }

      // Check if key already exists
      const isUpdate = BASE_URLS.hasOwnProperty(trimmedKey);
      
      // Store with comprehensive metadata
      BASE_URLS[trimmedKey] = {
        url: trimmedValue,
        createdAt: isUpdate ? BASE_URLS[trimmedKey].createdAt : timestamp,
        updatedAt: timestamp,
        accessCount: isUpdate ? BASE_URLS[trimmedKey].accessCount : 0,
        lastAccessed: isUpdate ? BASE_URLS[trimmedKey].lastAccessed : null,
        version: isUpdate ? (BASE_URLS[trimmedKey].version || 1) + 1 : 1
      };

      if (isUpdate) {
        updatedKeys.push(trimmedKey);
      } else {
        savedKeys.push(trimmedKey);
      }
    });

    // Return comprehensive response
    if (errors.length > 0 && savedKeys.length === 0 && updatedKeys.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid URLs were processed",
        errors: errors,
        timestamp: timestamp.iso
      });
    }

    res.status(200).json({
      success: true,
      message: `Successfully processed ${savedKeys.length + updatedKeys.length} URL(s)`,
      summary: {
        created: savedKeys.length,
        updated: updatedKeys.length,
        total: Object.keys(BASE_URLS).length
      },
      savedKeys: savedKeys,
      updatedKeys: updatedKeys,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: timestamp.iso
    });

  } catch (error) {
    console.error("Error in saveBaseUrl:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
});

// Get specific base URL by key with enhanced metadata
router.get("/getBaseUrl/:key", (req, res) => {
  try {
    const key = req.params.key?.trim();
    
    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Key parameter is required",
        timestamp: new Date().toISOString()
      });
    }

    if (!BASE_URLS[key]) {
      return res.status(404).json({
        success: false,
        message: `URL with key '${key}' not found`,
        availableKeys: Object.keys(BASE_URLS),
        timestamp: new Date().toISOString()
      });
    }

    // Update access metadata
    const timestamp = getTimestamp();
    BASE_URLS[key].accessCount += 1;
    BASE_URLS[key].lastAccessed = timestamp;

    res.status(200).json({
      success: true,
      key: key,
      url: BASE_URLS[key].url,
      metadata: {
        createdAt: BASE_URLS[key].createdAt,
        updatedAt: BASE_URLS[key].updatedAt,
        accessCount: BASE_URLS[key].accessCount,
        lastAccessed: timestamp,
        version: BASE_URLS[key].version || 1
      },
      timestamp: timestamp.iso
    });

  } catch (error) {
    console.error("Error in getBaseUrl:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
});

// Get all base URLs in various formats
router.get("/BaseUrls", (req, res) => {
  try {
    const format = req.query.format || 'html';
    const sortBy = req.query.sortBy || 'updatedAt'; // createdAt, accessCount, key
    const order = req.query.order || 'desc'; // asc, desc
    
    if (format === 'json') {
      // Return JSON format for API consumption
      let urlList = Object.entries(BASE_URLS).map(([key, data]) => ({
        key: key,
        url: data.url,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        accessCount: data.accessCount,
        lastAccessed: data.lastAccessed,
        version: data.version || 1
      }));

      // Sort the results
      urlList.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];
        
        if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
          aVal = new Date(aVal.iso).getTime();
          bVal = new Date(bVal.iso).getTime();
        } else if (sortBy === 'key') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (order === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });

      return res.status(200).json({
        success: true,
        count: urlList.length,
        urls: urlList,
        retrievedAt: getTimestamp().iso,
        sortedBy: sortBy,
        order: order
      });
    }

    // HTML format (minimal for existing UI compatibility)
    if (Object.keys(BASE_URLS).length === 0) {
      return res.send("<html><body><ul></ul></body></html>");
    }

    const urlEntries = Object.entries(BASE_URLS)
      .sort(([,a], [,b]) => {
        if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
          const aTime = new Date(a[sortBy].iso).getTime();
          const bTime = new Date(b[sortBy].iso).getTime();
          return order === 'desc' ? bTime - aTime : aTime - bTime;
        }
        return 0;
      })
      .map(([key, data]) => {
        return `<li><strong>${escapeHtml(key)}</strong>: ${escapeHtml(data.url)}</li>`;
      }).join("");

    const html = `<html><body><ul>${urlEntries}</ul></body></html>`;
    res.send(html);

  } catch (error) {
    console.error("Error in BaseUrls:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
});

// Get URL metadata only (without incrementing access count)
router.get("/getUrlInfo/:key", (req, res) => {
  try {
    const key = req.params.key?.trim();
    
    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Key parameter is required",
        timestamp: new Date().toISOString()
      });
    }

    if (!BASE_URLS[key]) {
      return res.status(404).json({
        success: false,
        message: `URL with key '${key}' not found`,
        availableKeys: Object.keys(BASE_URLS),
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      success: true,
      key: key,
      url: BASE_URLS[key].url,
      metadata: {
        createdAt: BASE_URLS[key].createdAt,
        updatedAt: BASE_URLS[key].updatedAt,
        accessCount: BASE_URLS[key].accessCount,
        lastAccessed: BASE_URLS[key].lastAccessed,
        version: BASE_URLS[key].version || 1
      },
      timestamp: getTimestamp().iso
    });

  } catch (error) {
    console.error("Error in getUrlInfo:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
});

// Delete a specific URL
router.delete("/deleteBaseUrl/:key", auth, (req, res) => {
  try {
    const key = req.params.key?.trim();
    
    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Key parameter is required",
        timestamp: new Date().toISOString()
      });
    }

    if (!BASE_URLS[key]) {
      return res.status(404).json({
        success: false,
        message: `URL with key '${key}' not found`,
        availableKeys: Object.keys(BASE_URLS),
        timestamp: new Date().toISOString()
      });
    }

    const deletedUrl = BASE_URLS[key];
    delete BASE_URLS[key];

    res.status(200).json({
      success: true,
      message: `URL with key '${key}' deleted successfully`,
      deletedUrl: deletedUrl,
      remainingCount: Object.keys(BASE_URLS).length,
      timestamp: getTimestamp().iso
    });

  } catch (error) {
    console.error("Error in deleteBaseUrl:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
});

// Get summary statistics
router.get("/stats", (req, res) => {
  try {
    const now = Date.now();
    const urls = Object.entries(BASE_URLS);
    
    const stats = {
      totalUrls: urls.length,
      totalAccesses: urls.reduce((sum, [, data]) => sum + data.accessCount, 0),
      mostAccessed: urls.length > 0 ? urls.reduce((max, [key, data]) => 
        data.accessCount > max.accessCount ? {key, ...data} : max, 
        {key: null, accessCount: 0}
      ) : null,
      oldestUrl: urls.length > 0 ? urls.reduce((oldest, [key, data]) => 
        new Date(data.createdAt.iso) < new Date(oldest.createdAt.iso) ? {key, ...data} : oldest
      ) : null,
      newestUrl: urls.length > 0 ? urls.reduce((newest, [key, data]) => 
        new Date(data.createdAt.iso) > new Date(newest.createdAt.iso) ? {key, ...data} : newest
      ) : null,
      timestamp: getTimestamp()
    };

    res.status(200).json({
      success: true,
      stats: stats
    });

  } catch (error) {
    console.error("Error in stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: getTimestamp().iso,
    urlCount: Object.keys(BASE_URLS).length
  });
});

module.exports = router;
