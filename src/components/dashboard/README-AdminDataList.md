# AdminDataList - Componente Reutilizável para Listas Administrativas

## Visão Geral

O `AdminDataList` é um componente reutilizável que unifica a estrutura de listas administrativas, eliminando duplicação de código entre diferentes listas como Employees, Clients, Services, etc.

## Características

- ✅ **Totalmente configurável** através de props
- ✅ **Responsivo** com views diferentes para mobile e desktop
- ✅ **Paginado** com componente de paginação integrado
- ✅ **Filtros** de busca e status configuráveis
- ✅ **Ações** personalizáveis por item
- ✅ **Estados de loading** para ações individuais
- ✅ **Tipagem TypeScript** completa

## Estrutura de Arquivos

```
src/components/dashboard/
├── AdminDataList.tsx          # Componente base reutilizável
├── AdminEmployeesListNew.tsx  # Exemplo de uso para Employees
├── AdminClientsListNew.tsx    # Exemplo de uso para Clients
└── README-AdminDataList.md    # Esta documentação
```

## Como Usar

### 1. Importar o Componente

```tsx
import AdminDataList, { Column, Action } from "./AdminDataList";
```

### 2. Configurar as Colunas

```tsx
const columns: Column[] = [
  {
    key: "name",
    label: "NOME",
    className: "font-medium text-gray-900",
  },
  {
    key: "email",
    label: "EMAIL",
    className: "text-gray-500",
  },
  {
    key: "status",
    label: "STATUS",
    render: (item) => (
      <span className={`badge ${item.isActive ? "active" : "inactive"}`}>
        {item.isActive ? "Ativo" : "Inativo"}
      </span>
    ),
  },
];
```

### 3. Configurar as Ações

```tsx
const actions: Action[] = [
  {
    key: "view",
    icon: <FiEye size={18} />,
    label: "Visualizar",
    onClick: (item) => onViewItem(item),
    className: "text-blue-600 hover:bg-blue-50",
  },
  {
    key: "edit",
    icon: <FiEdit size={18} />,
    label: "Editar",
    onClick: (item) => onEditItem(item),
    className: "text-green-600 hover:bg-green-50",
  },
  {
    key: "delete",
    icon: <FiTrash2 size={18} />,
    label: "Excluir",
    onClick: (item) => onDeleteItem(item.id),
    className: "text-red-600 hover:bg-red-50",
    disabled: (item) => deletingId === item.id,
  },
];
```

### 4. Usar o Componente

```tsx
<AdminDataList
  data={items}
  meta={meta}
  loading={loading}
  error={error}
  searchTerm={searchTerm}
  statusFilter={statusFilter}
  title="Meus Itens"
  addButtonText="Adicionar Item"
  searchPlaceholder="Buscar itens..."
  emptyMessage="Nenhum item encontrado."
  loadingMessage="Carregando..."
  columns={columns}
  actions={actions}
  onSearchChange={onSearchChange}
  onStatusFilterChange={onStatusFilterChange}
  onPageChange={onPageChange}
  onAddItem={onAddItem}
  onSelectItem={onSelectItem}
  loadingStates={{ delete: deletingId }}
  mobileView="cards"
/>
```

## Props Disponíveis

### Dados

- `data: DataItem[]` - Array de itens para exibir
- `meta: Meta` - Metadados da paginação

### Estados

- `loading: boolean` - Estado de carregamento
- `error: string | null` - Mensagem de erro
- `searchTerm: string` - Termo de busca
- `statusFilter: string` - Filtro de status

### Configuração

- `title: string` - Título da página
- `addButtonText: string` - Texto do botão de adicionar
- `searchPlaceholder: string` - Placeholder do campo de busca
- `emptyMessage: string` - Mensagem quando não há itens
- `loadingMessage: string` - Mensagem de carregamento

### Colunas e Ações

- `columns: Column[]` - Configuração das colunas
- `actions: Action[]` - Configuração das ações

### Callbacks

- `onSearchChange: (value: string) => void`
- `onStatusFilterChange: (value: string) => void`
- `onPageChange: (page: number) => void`
- `onAddItem: () => void`
- `onSelectItem: (item: DataItem) => void`

### Opcionais

- `loadingStates?: { [key: string]: string | null }` - Estados de loading por ação
- `showStatusFilter?: boolean` - Mostrar filtro de status (padrão: true)
- `statusOptions?: { value: string; label: string }[]` - Opções do filtro de status
- `mobileView?: 'list' | 'cards'` - Tipo de view mobile (padrão: 'list')
- `showPagination?: boolean` - Mostrar paginação (padrão: true)

## Tipos TypeScript

### DataItem

```tsx
interface DataItem {
  id: string;
  [key: string]: any;
}
```

### Column

```tsx
interface Column {
  key: string;
  label: string;
  render?: (item: DataItem) => ReactNode;
  className?: string;
  width?: string;
}
```

### Action

```tsx
interface Action {
  key: string;
  icon: ReactNode;
  label: string;
  onClick: (item: DataItem) => void;
  className?: string;
  disabled?: (item: DataItem) => boolean;
  show?: (item: DataItem) => boolean;
}
```

## Exemplos de Uso

### Lista de Employees

Ver `AdminEmployeesListNew.tsx` para exemplo completo.

### Lista de Clients

Ver `AdminClientsListNew.tsx` para exemplo completo.

## Migração das Listas Existentes

Para migrar uma lista existente:

1. **Criar novo arquivo** usando o padrão `Admin[Entity]ListNew.tsx`
2. **Configurar colunas** baseado na estrutura atual
3. **Configurar ações** com os callbacks existentes
4. **Testar** a nova implementação
5. **Substituir** a importação na página principal
6. **Remover** o arquivo antigo após confirmação

## Vantagens

- **DRY (Don't Repeat Yourself)** - Elimina duplicação de código
- **Consistência** - Interface uniforme em todas as listas
- **Manutenibilidade** - Mudanças centralizadas
- **Flexibilidade** - Configurável para diferentes casos de uso
- **Performance** - Componente otimizado e reutilizável

## Próximos Passos

1. Migrar todas as listas existentes para usar o `AdminDataList`
2. Adicionar mais opções de customização conforme necessário
3. Implementar testes unitários
4. Adicionar mais tipos de view mobile se necessário
