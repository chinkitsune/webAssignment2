document.addEventListener('DOMContentLoaded', () => {
  const btnRestore = document.getElementById('btn-restore');
  const btnExport = document.getElementById('btn-export');
  const messageContainer = document.getElementById('db-message');

  const showMessage = (msg, isSuccess) => {
    messageContainer.textContent = msg;
    messageContainer.style.color = isSuccess ? 'green' : 'red';
    messageContainer.style.fontWeight = 'bold';
    messageContainer.style.marginBottom = '15px';
  };

  const handleDbAction = async (url, actionName) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.res === 'success') {
        showMessage(`${actionName} successful!`, true);
      } else {
        showMessage(`${actionName} failed.`, false);
      }
    } catch (error) {
      console.error(error);
      showMessage(`An error occurred during ${actionName}.`, false);
    }
  };

  if (btnRestore) {
    btnRestore.addEventListener('click', () => handleDbAction('/backup/import', 'Restore'));
  }

  if (btnExport) {
    btnExport.addEventListener('click', () => handleDbAction('/backup/export', 'Export'));
  }
});
