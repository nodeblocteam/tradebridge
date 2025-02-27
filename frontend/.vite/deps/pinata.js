import "./chunk-256EKJAK.js";

// node_modules/pinata/dist/index.mjs
var PinataError = class extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = "PinataError";
  }
};
var NetworkError = class extends PinataError {
  constructor(message, statusCode, details) {
    super(message, statusCode, details);
    this.name = "NetworkError";
  }
};
var AuthenticationError = class extends PinataError {
  constructor(message, statusCode, details) {
    super(message, statusCode, details);
    this.name = "AuthenticationError";
  }
};
var ValidationError = class extends PinataError {
  constructor(message, details) {
    super(message, void 0, details);
    this.name = "ValidationError";
  }
};
var testAuthentication = async (config) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  let endpoint = "https://api.pinata.cloud";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/testAuthentication"
    };
  }
  try {
    const request = await fetch(`${endpoint}/data/testAuthentication`, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(
        `Error processing authentication: ${error.message}`
      );
    }
    throw new PinataError(
      "An unknown error occurred while testing authentication"
    );
  }
};
var uploadFile = async (config, file, options) => {
  var _a;
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = (options == null ? void 0 : options.keys) || config.pinataJwt;
  const data = new FormData();
  data.append("file", file, file.name);
  data.append("name", ((_a = options == null ? void 0 : options.metadata) == null ? void 0 : _a.name) || file.name || "File from SDK");
  if (options == null ? void 0 : options.groupId) {
    data.append("group_id", options.groupId);
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      Source: "sdk/file"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error uploading file: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while uploading the file");
  }
};
var uploadBase64 = async (config, base64String, options) => {
  var _a, _b;
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = (options == null ? void 0 : options.keys) || (config == null ? void 0 : config.pinataJwt);
  const name = ((_a = options == null ? void 0 : options.metadata) == null ? void 0 : _a.name) ? (_b = options == null ? void 0 : options.metadata) == null ? void 0 : _b.name : "base64 string";
  const buffer = Buffer.from(base64String, "base64");
  const blob = new Blob([buffer]);
  const data = new FormData();
  data.append("file", blob, name);
  data.append("name", name);
  if (options == null ? void 0 : options.groupId) {
    data.append("group_id", options.groupId);
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      Source: "sdk/base64"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing base64: ${error.message}`);
    }
    throw new PinataError(
      "An unknown error occurred while trying to upload base64"
    );
  }
};
var uploadUrl = async (config, url, options) => {
  var _a;
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = (options == null ? void 0 : options.keys) || (config == null ? void 0 : config.pinataJwt);
  const data = new FormData();
  const stream = await fetch(url);
  if (!stream.ok) {
    const errorData = await stream.text();
    throw new NetworkError(
      `HTTP error: ${errorData}`,
      stream.status,
      errorData
    );
  }
  const arrayBuffer = await stream.arrayBuffer();
  const blob = new Blob([arrayBuffer]);
  const name = ((_a = options == null ? void 0 : options.metadata) == null ? void 0 : _a.name) ?? "url_upload";
  const file = new File([blob], name);
  data.append("file", file, name);
  data.append("name", name);
  if (options == null ? void 0 : options.groupId) {
    data.append("group_id", options.groupId);
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      Source: "sdk/url"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing url: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while uploading by url");
  }
};
var uploadJson = async (config, jsonData, options) => {
  var _a;
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const jwt = (options == null ? void 0 : options.keys) || (config == null ? void 0 : config.pinataJwt);
  const json = JSON.stringify(jsonData);
  const blob = new Blob([json]);
  const file = new File([blob], "data.json", { type: "application/json" });
  const data = new FormData();
  data.append("file", file, file.name);
  data.append("name", ((_a = options == null ? void 0 : options.metadata) == null ? void 0 : _a.name) || file.name || "File from SDK");
  if (options == null ? void 0 : options.groupId) {
    data.append("group_id", options.groupId);
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${jwt}`,
      Source: "sdk/json"
    };
  }
  let endpoint = "https://uploads.pinata.cloud/v3";
  if (config.uploadUrl) {
    endpoint = config.uploadUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing json: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while uploading json");
  }
};
var wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
var deleteFile = async (config, files) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const responses = [];
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/deleteFile"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  for (const id of files) {
    try {
      const response = await fetch(`${endpoint}/files/${id}`, {
        method: "DELETE",
        headers
      });
      await wait(300);
      if (!response.ok) {
        const errorData = await response.text();
        if (response.status === 401) {
          throw new AuthenticationError(
            `Authentication failed: ${errorData}`,
            response.status,
            errorData
          );
        }
        throw new NetworkError(
          `HTTP error: ${errorData}`,
          response.status,
          errorData
        );
      }
      responses.push({
        id,
        status: response.statusText
      });
    } catch (error) {
      let errorMessage;
      if (error instanceof PinataError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = `Error deleting file ${id}: ${error.message}`;
      } else {
        errorMessage = `An unknown error occurred while deleting file ${id}`;
      }
      responses.push({
        id,
        status: errorMessage
      });
    }
  }
  return responses;
};
var listFiles = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const params = new URLSearchParams();
  if (options) {
    const { name, group, cid, order, limit, mimeType, pageToken, cidPending } = options;
    if (limit)
      params.append("limit", limit.toString());
    if (name)
      params.append("name", name);
    if (group)
      params.append("group", group);
    if (cid)
      params.append("cid", cid);
    if (mimeType)
      params.append("mimeType", mimeType);
    if (order)
      params.append("order", order);
    if (pageToken)
      params.append("pageToken", pageToken);
    if (cidPending)
      params.append("cidPending", "true");
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  const url = `${endpoint}/files?${params.toString()}`;
  try {
    let headers;
    if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
      headers = { ...config.customHeaders };
    } else {
      headers = {
        Authorization: `Bearer ${config.pinataJwt}`,
        Source: "sdk/listFiles"
      };
    }
    const request = await fetch(url, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing list files: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while listing files");
  }
};
var updateFile = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const data = JSON.stringify({
    name: options.name
  });
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/updateMetadata"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/${options.id}`, {
      method: "PUT",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing updateFile: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while updating file");
  }
};
var getCid = async (config, cid, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let data;
  let newUrl = `${config == null ? void 0 : config.pinataGateway}/files/${cid}`;
  const params = new URLSearchParams();
  if (options) {
    if (options.width)
      params.append("img-width", options.width.toString());
    if (options.height)
      params.append("img-height", options.height.toString());
    if (options.dpr)
      params.append("img-dpr", options.dpr.toString());
    if (options.fit)
      params.append("img-fit", options.fit);
    if (options.gravity)
      params.append("img-gravity", options.gravity);
    if (options.quality)
      params.append("img-quality", options.quality.toString());
    if (options.format)
      params.append("img-format", options.format);
    if (options.animation !== void 0)
      params.append("img-anim", options.animation.toString());
    if (options.sharpen)
      params.append("img-sharpen", options.sharpen.toString());
    if (options.onError === true)
      params.append("img-onerror", "redirect");
    if (options.metadata)
      params.append("img-metadata", options.metadata);
  }
  const queryString = params.toString();
  if (queryString) {
    newUrl += `?${queryString}`;
  }
  const date = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
  const payload = JSON.stringify({
    url: newUrl,
    date,
    expires: 30,
    method: "GET"
  });
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/getCid"
    };
  }
  const signedUrlRequest = await fetch(`${endpoint}/files/sign`, {
    method: "POST",
    headers,
    body: payload
  });
  const signedUrl = await signedUrlRequest.json();
  try {
    const request = await fetch(signedUrl.data);
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication Failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const contentType = request.headers.get("content-type");
    if (contentType == null ? void 0 : contentType.includes("application/json")) {
      data = await request.json();
    } else if (contentType == null ? void 0 : contentType.includes("text/")) {
      data = await request.text();
    } else {
      data = await request.blob();
    }
    const res = {
      data,
      contentType
    };
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing getCid: ${error.message}`);
    }
    throw new PinataError(
      "An unknown error occurred while getting CID contents"
    );
  }
};
var createKey = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/createKey"
    };
  }
  const data = JSON.stringify(options);
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/pinata/keys`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing createKey: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while creating API key");
  }
};
var listKeys = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/listKeys"
    };
  }
  const params = new URLSearchParams();
  if (options) {
    const { offset, name, revoked, limitedUse, exhausted } = options;
    if (offset)
      params.append("offset", offset.toString());
    if (revoked !== void 0)
      params.append("revoked", revoked.toString());
    if (limitedUse !== void 0)
      params.append("limitedUse", limitedUse.toString());
    if (exhausted !== void 0)
      params.append("exhausted", exhausted.toString());
    if (name)
      params.append("name", name);
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(
      `${endpoint}/pinata/keys?${params.toString()}`,
      {
        method: "GET",
        headers
      }
    );
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    return res.keys;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing listKeys: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while listing API keys");
  }
};
var wait2 = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
var revokeKeys = async (config, keys) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/revokeKeys"
    };
  }
  const responses = [];
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  for (const key of keys) {
    try {
      const request = await fetch(`${endpoint}/pinata/keys/${key}`, {
        method: "PUT",
        headers
      });
      await wait2(300);
      if (!request.ok) {
        const errorData = await request.text();
        if (request.status === 401 || request.status === 403) {
          throw new AuthenticationError(
            `Authentication failed: ${errorData}`,
            request.status,
            errorData
          );
        }
        throw new NetworkError(
          `HTTP error: ${errorData}`,
          request.status,
          errorData
        );
      }
      const result = await request.json();
      responses.push({
        key,
        status: result
      });
    } catch (error) {
      let errorMessage;
      if (error instanceof PinataError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = `Error revoking key ${key}: ${error.message}`;
      } else {
        errorMessage = `An unknown error occurred while revoking key ${key}`;
      }
      responses.push({
        key,
        status: errorMessage
      });
    }
  }
  return responses;
};
var createGroup = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const data = JSON.stringify({
    name: options.name,
    is_public: options.isPublic
  });
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/createGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/groups`, {
      method: "POST",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing createGroup: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while creating a group");
  }
};
var listGroups = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/listGroups"
    };
  }
  const params = new URLSearchParams();
  if (options) {
    const { pageToken, name, limit, isPublic } = options;
    if (pageToken)
      params.append("pageToken", pageToken.toString());
    if (isPublic)
      params.append("isPublic", isPublic.toString());
    if (name)
      params.append("name", name);
    if (limit !== void 0)
      params.append("limit", limit.toString());
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(
      `${endpoint}/files/groups?${params.toString()}`,
      {
        method: "GET",
        headers
      }
    );
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing listGroups: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while listing groups");
  }
};
var getGroup = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/getGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/groups/${options.groupId}`, {
      method: "GET",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing getGroup: ${error.message}`);
    }
    throw new PinataError(
      "An unknown error occurred while getting info for a group"
    );
  }
};
var updateGroup = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const data = JSON.stringify({
    name: options.name,
    is_public: options.isPublic
  });
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/updateGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/groups/${options.groupId}`, {
      method: "PUT",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing updateGroup: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while updating group");
  }
};
var deleteGroup = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/deleteGroup"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/groups/${options.groupId}`, {
      method: "DELETE",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = request.statusText;
    return res;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing deleteGroup: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while deleting a group");
  }
};
var swapCid = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  const data = JSON.stringify({
    swap_cid: options.swapCid
  });
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/swapCid"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/swap/${options.cid}`, {
      method: "PUT",
      headers,
      body: data
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      if (request.status === 403) {
        throw new PinataError(
          "Unauthorized CID Swap",
          request.status,
          errorData
        );
      }
      if (request.status === 404) {
        throw new PinataError(
          "CID not pinned to account",
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing CID Swap: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while swapping CID");
  }
};
var swapHistory = async (config, options) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/swapHistory"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(
      `${endpoint}/files/swap/${options.cid}?domain=${options.domain}`,
      {
        method: "GET",
        headers
      }
    );
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      if (request.status === 404) {
        throw new PinataError(
          "CID does not have history",
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    const resData = res.data;
    return resData;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error fetching swap history: ${error.message}`);
    }
    throw new PinataError(
      "An unknown error occurred while fetching swap history"
    );
  }
};
var deleteSwap = async (config, cid) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      Authorization: `Bearer ${config.pinataJwt}`,
      "Content-Type": "application/json",
      Source: "sdk/deleteSwap"
    };
  }
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  try {
    const request = await fetch(`${endpoint}/files/swap/${cid}`, {
      method: "DELETE",
      headers
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      if (request.status === 403) {
        throw new PinataError(
          "Unauthorized CID Swap Deletion",
          request.status,
          errorData
        );
      }
      if (request.status === 404) {
        throw new PinataError(
          "CID not pinned to account",
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    return request.statusText;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(`Error processing deleteSwap: ${error.message}`);
    }
    throw new PinataError("An unknown error occurred while deleting swap");
  }
};
var createSignedURL = async (config, options, imgOpts) => {
  if (!config) {
    throw new ValidationError("Pinata configuration is missing");
  }
  let baseUrl;
  if (options == null ? void 0 : options.gateway) {
    baseUrl = options.gateway.startsWith("https://") ? options.gateway : `https://${options.gateway}`;
  } else {
    baseUrl = config.pinataGateway;
  }
  let newUrl = `${baseUrl}/files/${options.cid}`;
  const params = new URLSearchParams();
  if (imgOpts) {
    if (imgOpts.width)
      params.append("img-width", imgOpts.width.toString());
    if (imgOpts.height)
      params.append("img-height", imgOpts.height.toString());
    if (imgOpts.dpr)
      params.append("img-dpr", imgOpts.dpr.toString());
    if (imgOpts.fit)
      params.append("img-fit", imgOpts.fit);
    if (imgOpts.gravity)
      params.append("img-gravity", imgOpts.gravity);
    if (imgOpts.quality)
      params.append("img-quality", imgOpts.quality.toString());
    if (imgOpts.format)
      params.append("img-format", imgOpts.format);
    if (imgOpts.animation !== void 0)
      params.append("img-anim", imgOpts.animation.toString());
    if (imgOpts.sharpen)
      params.append("img-sharpen", imgOpts.sharpen.toString());
    if (imgOpts.onError === true)
      params.append("img-onerror", "redirect");
    if (imgOpts.metadata)
      params.append("img-metadata", imgOpts.metadata);
  }
  const queryString = params.toString();
  if (queryString) {
    newUrl += `?${queryString}`;
  }
  const date = (options == null ? void 0 : options.date) || Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
  const payload = JSON.stringify({
    url: newUrl,
    date,
    expires: options.expires,
    method: "GET"
  });
  let endpoint = "https://api.pinata.cloud/v3";
  if (config.endpointUrl) {
    endpoint = config.endpointUrl;
  }
  let headers;
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    headers = { ...config.customHeaders };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.pinataJwt}`,
      Source: "sdk/createSignURL"
    };
  }
  try {
    const request = await fetch(`${endpoint}/files/sign`, {
      method: "POST",
      headers,
      body: payload
    });
    if (!request.ok) {
      const errorData = await request.text();
      if (request.status === 401 || request.status === 403) {
        throw new AuthenticationError(
          `Authentication Failed: ${errorData}`,
          request.status,
          errorData
        );
      }
      throw new NetworkError(
        `HTTP error: ${errorData}`,
        request.status,
        errorData
      );
    }
    const res = await request.json();
    return res.data;
  } catch (error) {
    if (error instanceof PinataError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new PinataError(
        `Error processing createSignedURL: ${error.message}`
      );
    }
    throw new PinataError("An unknown error occurred while getting signed url");
  }
};
var formatConfig = (config) => {
  let gateway = config == null ? void 0 : config.pinataGateway;
  if (config && gateway) {
    if (gateway && !gateway.startsWith("https://")) {
      gateway = `https://${gateway}`;
    }
    config.pinataGateway = gateway;
  }
  return config;
};
var PinataSDK = class {
  //signatures: Signatures;
  constructor(config) {
    this.config = formatConfig(config);
    this.files = new Files(this.config);
    this.upload = new Upload(this.config);
    this.gateways = new Gateways(this.config);
    this.keys = new Keys(this.config);
    this.groups = new Groups(this.config);
  }
  setNewHeaders(headers) {
    if (!this.config) {
      this.config = { pinataJwt: "", customHeaders: {} };
    }
    this.config.customHeaders = { ...this.config.customHeaders, ...headers };
    this.files.updateConfig(this.config);
    this.upload.updateConfig(this.config);
    this.gateways.updateConfig(this.config);
    this.keys.updateConfig(this.config);
    this.groups.updateConfig(this.config);
  }
  testAuthentication() {
    return testAuthentication(this.config);
  }
};
var Files = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  list() {
    return new FilterFiles(this.config);
  }
  delete(files) {
    return deleteFile(this.config, files);
  }
  update(options) {
    return updateFile(this.config, options);
  }
  addSwap(options) {
    return swapCid(this.config, options);
  }
  getSwapHistory(options) {
    return swapHistory(this.config, options);
  }
  deleteSwap(cid) {
    return deleteSwap(this.config, cid);
  }
};
var UploadBuilder = class {
  constructor(config, uploadFunction, ...args) {
    this.config = config;
    this.uploadFunction = uploadFunction;
    this.args = args;
  }
  addMetadata(metadata) {
    this.metadata = metadata;
    return this;
  }
  key(jwt) {
    this.keys = jwt;
    return this;
  }
  // cidVersion(v: 0 | 1): UploadBuilder<T> {
  // 	this.version = v;
  // 	return this;
  // }
  group(groupId) {
    this.groupId = groupId;
    return this;
  }
  then(onfulfilled, onrejected) {
    const options = this.args[this.args.length - 1] || {};
    if (this.metadata) {
      options.metadata = this.metadata;
    }
    if (this.keys) {
      options.keys = this.keys;
    }
    if (this.groupId) {
      options.groupId = this.groupId;
    }
    this.args[this.args.length - 1] = options;
    return this.uploadFunction(this.config, ...this.args).then(
      onfulfilled,
      onrejected
    );
  }
};
var Upload = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  file(file, options) {
    return new UploadBuilder(this.config, uploadFile, file, options);
  }
  // fileArray(
  // 	files: FileObject[],
  // 	options?: UploadOptions,
  // ): UploadBuilder<UploadResponse> {
  // 	return new UploadBuilder(this.config, uploadFileArray, files, options);
  // }
  base64(base64String, options) {
    return new UploadBuilder(this.config, uploadBase64, base64String, options);
  }
  url(url, options) {
    return new UploadBuilder(this.config, uploadUrl, url, options);
  }
  json(data, options) {
    return new UploadBuilder(this.config, uploadJson, data, options);
  }
};
var FilterFiles = class {
  // rate limit vars
  // private requestCount = 0;
  // private lastRequestTime = 0;
  // private readonly MAX_REQUESTS_PER_MINUTE = 30;
  // private readonly MINUTE_IN_MS = 60000;
  constructor(config) {
    this.query = {};
    this.config = config;
  }
  name(name) {
    this.query.name = name;
    return this;
  }
  group(group) {
    this.query.group = group;
    return this;
  }
  cid(cid) {
    this.query.cid = cid;
    return this;
  }
  mimeType(mimeType) {
    this.query.mimeType = mimeType;
    return this;
  }
  order(order) {
    this.query.order = order;
    return this;
  }
  limit(limit) {
    this.query.limit = limit;
    return this;
  }
  cidPending(cidPending) {
    this.query.cidPending = cidPending;
    return this;
  }
  pageToken(pageToken) {
    this.query.pageToken = pageToken;
    return this;
  }
  then(onfulfilled) {
    return this.fetchPage().then(onfulfilled);
  }
  async fetchPage() {
    if (this.currentPageToken) {
      this.query.pageToken = this.currentPageToken;
    }
    const response = await listFiles(this.config, this.query);
    this.currentPageToken = response.next_page_token;
    return response;
  }
  // // rate limit, hopefully temporary?
  // private async rateLimit(): Promise<void> {
  // 	this.requestCount++;
  // 	const now = Date.now();
  // 	if (this.requestCount >= this.MAX_REQUESTS_PER_MINUTE) {
  // 		const timePassedSinceLastRequest = now - this.lastRequestTime;
  // 		if (timePassedSinceLastRequest < this.MINUTE_IN_MS) {
  // 			const delayTime = this.MINUTE_IN_MS - timePassedSinceLastRequest;
  // 			await new Promise((resolve) => setTimeout(resolve, delayTime));
  // 		}
  // 		this.requestCount = 0;
  // 	}
  // 	this.lastRequestTime = Date.now();
  // }
  async *[Symbol.asyncIterator]() {
    while (true) {
      const items = await this.fetchPage();
      for (const item of items.files) {
        yield item;
      }
      if (!this.currentPageToken) {
        break;
      }
    }
  }
  async all() {
    const allItems = [];
    for await (const item of this) {
      allItems.push(item);
    }
    return allItems;
  }
};
var Gateways = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  get(cid) {
    return new OptimizeImageGetCid(this.config, cid);
  }
  createSignedURL(options) {
    return new OptimizeImageCreateSignedURL(this.config, options);
  }
  // topUsageAnalytics(options: {
  // 	domain: string;
  // 	start: string;
  // 	end: string;
  // 	sortBy: "requests" | "bandwidth";
  // 	attribute:
  // 		| "cid"
  // 		| "country"
  // 		| "region"
  // 		| "user_agent"
  // 		| "referer"
  // 		| "file_name";
  // }): TopGatewayAnalyticsBuilder {
  // 	return new TopGatewayAnalyticsBuilder(
  // 		this.config,
  // 		options.domain,
  // 		options.start,
  // 		options.end,
  // 		options.sortBy,
  // 		options.attribute,
  // 	);
  // }
  // dateIntervalAnalytics(options: {
  // 	domain: string;
  // 	start: string;
  // 	end: string;
  // 	interval: "day" | "week";
  // }): TimeIntervalGatewayAnalyticsBuilder {
  // 	return new TimeIntervalGatewayAnalyticsBuilder(
  // 		this.config,
  // 		options.domain,
  // 		options.start,
  // 		options.end,
  // 		options.interval,
  // 	);
  // }
};
var OptimizeImageGetCid = class {
  constructor(config, cid) {
    this.options = {};
    this.config = config;
    this.cid = cid;
  }
  optimizeImage(options) {
    this.options = { ...this.options, ...options };
    return this;
  }
  then(onfulfilled) {
    return getCid(this.config, this.cid, this.options).then(onfulfilled);
  }
};
var OptimizeImageCreateSignedURL = class {
  constructor(config, urlOpts) {
    this.imgOpts = {};
    this.config = config;
    this.urlOpts = urlOpts;
  }
  optimizeImage(options) {
    this.imgOpts = { ...this.imgOpts, ...options };
    return this;
  }
  then(onfulfilled) {
    return createSignedURL(this.config, this.urlOpts, this.imgOpts).then(
      onfulfilled
    );
  }
};
var Keys = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  create(options) {
    return createKey(this.config, options);
  }
  list() {
    return new FilterKeys(this.config);
  }
  revoke(keys) {
    return revokeKeys(this.config, keys);
  }
};
var FilterKeys = class {
  // rate limit vars
  // private requestCount = 0;
  // private lastRequestTime = 0;
  // private readonly MAX_REQUESTS_PER_MINUTE = 30;
  // private readonly MINUTE_IN_MS = 60000;
  constructor(config) {
    this.query = {};
    this.config = config;
  }
  offset(offset) {
    this.query.offset = offset;
    return this;
  }
  revoked(revoked) {
    this.query.revoked = revoked;
    return this;
  }
  limitedUse(limitedUse) {
    this.query.limitedUse = limitedUse;
    return this;
  }
  exhausted(exhausted) {
    this.query.exhausted = exhausted;
    return this;
  }
  name(name) {
    this.query.name = name;
    return this;
  }
  then(onfulfilled) {
    return listKeys(this.config, this.query).then(onfulfilled);
  }
  // private async rateLimit(): Promise<void> {
  // 	this.requestCount++;
  // 	const now = Date.now();
  // 	if (this.requestCount >= this.MAX_REQUESTS_PER_MINUTE) {
  // 		const timePassedSinceLastRequest = now - this.lastRequestTime;
  // 		if (timePassedSinceLastRequest < this.MINUTE_IN_MS) {
  // 			const delayTime = this.MINUTE_IN_MS - timePassedSinceLastRequest;
  // 			await new Promise((resolve) => setTimeout(resolve, delayTime));
  // 		}
  // 		this.requestCount = 0;
  // 	}
  // 	this.lastRequestTime = Date.now();
  // }
  async *[Symbol.asyncIterator]() {
    let hasMore = true;
    let offset = 0;
    while (hasMore) {
      this.query.offset = offset;
      const items = await listKeys(this.config, this.query);
      for (const item of items) {
        yield item;
      }
      if (items.length === 0) {
        hasMore = false;
      } else {
        offset += items.length;
      }
    }
  }
  async all() {
    const allItems = [];
    for await (const item of this) {
      allItems.push(item);
    }
    return allItems;
  }
};
var Groups = class {
  constructor(config) {
    this.config = formatConfig(config);
  }
  updateConfig(newConfig) {
    this.config = newConfig;
  }
  create(options) {
    return createGroup(this.config, options);
  }
  list() {
    return new FilterGroups(this.config);
  }
  get(options) {
    return getGroup(this.config, options);
  }
  // addFiles(options: GroupCIDOptions): Promise<string> {
  // 	return addToGroup(this.config, options);
  // }
  // removeFiles(options: GroupCIDOptions): Promise<string> {
  // 	return removeFromGroup(this.config, options);
  // }
  update(options) {
    return updateGroup(this.config, options);
  }
  delete(options) {
    return deleteGroup(this.config, options);
  }
};
var FilterGroups = class {
  constructor(config) {
    this.query = {};
    this.config = config;
  }
  name(name) {
    this.query.name = name;
    return this;
  }
  limit(limit) {
    this.query.limit = limit;
    return this;
  }
  isPublic(isPublic) {
    this.query.isPublic = isPublic;
    return this;
  }
  pageToken(pageToken) {
    this.query.pageToken = pageToken;
    return this;
  }
  then(onfulfilled) {
    return this.fetchPage().then((response) => {
      this.nextPageToken = response.next_page_token;
      return response;
    }).then(onfulfilled);
  }
  async fetchPage() {
    if (this.nextPageToken) {
      this.query.pageToken = this.nextPageToken;
    }
    return listGroups(this.config, this.query);
  }
  // rate limit, hopefully temporary?
  // private async rateLimit(): Promise<void> {
  // 	this.requestCount++;
  // 	const now = Date.now();
  // 	if (this.requestCount >= this.MAX_REQUESTS_PER_MINUTE) {
  // 		const timePassedSinceLastRequest = now - this.lastRequestTime;
  // 		if (timePassedSinceLastRequest < this.MINUTE_IN_MS) {
  // 			const delayTime = this.MINUTE_IN_MS - timePassedSinceLastRequest;
  // 			await new Promise((resolve) => setTimeout(resolve, delayTime));
  // 		}
  // 		this.requestCount = 0;
  // 	}
  // 	this.lastRequestTime = Date.now();
  // }
  async *[Symbol.asyncIterator]() {
    while (true) {
      const response = await this.fetchPage();
      for (const item of response.groups) {
        yield item;
      }
      if (!response.next_page_token) {
        break;
      }
      this.nextPageToken = response.next_page_token;
    }
  }
  async all() {
    const allItems = [];
    for await (const item of this) {
      allItems.push(item);
    }
    return allItems;
  }
};
export {
  PinataSDK
};
//# sourceMappingURL=pinata.js.map
