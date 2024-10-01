import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';

const MyCustomModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  // Permite que métodos sejam chamados a partir do componente pai
  useImperativeHandle(ref, () => ({
    dismiss: () => setVisible(false),
    open: () => setVisible(true),
  }));

  return (
    <Modal visible={visible} onRequestClose={() => setVisible(false)}>
      <View style={{ padding: 20 }}>
        <Text>Este é um modal</Text>
        <Button title="Fechar" onPress={() => setVisible(false)} />
      </View>
    </Modal>
  );
});

export default MyCustomModal;
