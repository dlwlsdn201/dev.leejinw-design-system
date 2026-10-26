import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { Select } from './Select';
import { Switch } from './Switch';
import { RadioGroup } from './RadioGroup';
import { Dialog, DialogContent, DialogTrigger } from './Dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from './AlertDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { Alert } from './Alert';
import { Spinner } from './Spinner';
import { Toast, ToastProvider, ToastViewport } from './Toast';

describe('selection controls', () => {
  it('connects select validation and honors disabled', () => {
    render(<Select label="Sort" options={[{value:'recent',label:'Newest'}]} hint="Choose an order" error="Required" disabled />);
    expect(screen.getByRole('combobox', { name: 'Sort' })).toBeDisabled();
    expect(screen.getByRole('combobox')).toHaveAccessibleDescription('Choose an order Required');
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });
  it('toggles a switch from its label and keeps disabled switches unchanged', async () => {
    const user = userEvent.setup();
    render(<><Switch label="Autosave" /><Switch label="Locked" disabled /></>);
    await user.click(screen.getByText('Autosave'));
    expect(screen.getByRole('switch', { name: 'Autosave' })).toBeChecked();
    await user.click(screen.getByText('Locked'));
    expect(screen.getByRole('switch', { name: 'Locked' })).not.toBeChecked();
  });
  it('selects a native radio from its label and excludes disabled choices', async () => {
    const user = userEvent.setup();
    render(<RadioGroup label="Visibility" defaultValue="public" options={[{value:'public',label:'Public'},{value:'locked',label:'Locked',disabled:true},{value:'private',label:'Private'}]} />);
    await user.click(screen.getByText('Private'));
    await waitFor(() => expect(screen.getByRole('radio', { name: 'Private' })).toBeChecked());
    await user.click(screen.getByText('Locked'));
    expect(screen.getByRole('radio', { name: 'Locked' })).not.toBeChecked();
  });
});

describe('modal behavior', () => {
  it('provides accessible content, traps focus, closes on Escape, and restores trigger focus', async () => {
    const user = userEvent.setup();
    render(<Dialog><DialogTrigger asChild><Button>Open</Button></DialogTrigger><DialogContent title="Edit project" description="Change its name" closeLabel="Close"><input aria-label="Project name" /></DialogContent></Dialog>);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog', { name: 'Edit project' });
    expect(dialog).toHaveAccessibleDescription('Change its name');
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await user.tab();
    await user.tab();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus();
  });
  it('keeps an alert dialog open when the consumer prevents a failed action', async () => {
    const user = userEvent.setup();
    render(<AlertDialog><AlertDialogTrigger asChild><Button>Delete</Button></AlertDialogTrigger><AlertDialogContent title="Delete project?" description="Confirm removal"><AlertDialogCancel asChild><Button>Cancel</Button></AlertDialogCancel><AlertDialogAction asChild><Button onClick={event => event.preventDefault()}>Confirm</Button></AlertDialogAction></AlertDialogContent></AlertDialog>);
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });
});

it('links tabs and panels and navigates past disabled tabs', async () => {
  const user = userEvent.setup();
  render(<Tabs defaultValue="overview"><TabsList aria-label="Project"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="locked" disabled>Locked</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList><TabsContent value="overview">Summary</TabsContent><TabsContent value="activity">Changes</TabsContent></Tabs>);
  await user.tab(); await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('tabpanel', { name: 'Activity' })).toHaveTextContent('Changes');
});

it('exposes distinct informational, urgent, and loading messages', () => {
  render(<><Alert title="Saved">Draft only</Alert><Alert title="Failed" tone="error">Retry</Alert><Spinner label="Loading projects" /></>);
  expect(screen.getByRole('alert')).toHaveTextContent('Failed');
  expect(screen.getAllByRole('status')).toHaveLength(2);
  expect(screen.getByText('Loading projects')).toBeVisible();
});

it('lets the user dismiss a notification', async () => {
  const user = userEvent.setup();
  render(<ToastProvider><Toast defaultOpen title="Saved" closeLabel="Dismiss" duration={Infinity} /><ToastViewport label="Notifications" /></ToastProvider>);
  await screen.findByText('Saved');
  screen.getByRole('button', { name: 'Dismiss' }).focus();
  await user.keyboard('{Enter}');
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument());
});
